export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const { username } = req.body || {};

    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "A Roblox username is required." });
    }

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      return res.status(400).json({ error: "A Roblox username is required." });
    }

    const userResponse = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usernames: [cleanUsername],
        excludeBannedUsers: true
      })
    });

    if (!userResponse.ok) {
      return res.status(502).json({ error: "Unable to resolve Roblox account." });
    }

    const userData = await userResponse.json();

    if (!userData.data || !userData.data.length) {
      return res.status(404).json({ error: "Roblox user not found." });
    }

    const user = userData.data[0];
    const userId = user.id;

    const groupsResponse = await fetch(`https://groups.roblox.com/v2/users/${userId}/groups/roles`);

    if (!groupsResponse.ok) {
      return res.status(502).json({ error: "Unable to load Roblox group roles." });
    }

    const groupData = await groupsResponse.json();
    const membership = (groupData.data || []).find(
      entry => entry.group && entry.group.id === 342605681
    );

    if (!membership) {
      return res.status(403).json({ error: "Access denied. User is not in the CLPD Roblox group." });
    }

    return res.status(200).json({
      username: user.name,
      userId,
      rank: membership.role?.name || "Unknown Rank"
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
