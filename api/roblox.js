export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Missing username" });
    }

    // STEP 1: USER ID
    const userRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: true
      })
    });

    const userData = await userRes.json();

    if (!userData.data || !userData.data.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userData.data[0].id;

    // STEP 2: GROUP RANK
    const groupRes = await fetch(`https://groups.roblox.com/v2/users/${userId}/groups/roles`);
    const groupData = await groupRes.json();

    const group = groupData.data.find(g => g.group.id === 342605681);

    if (!group) {
      return res.status(403).json({ error: "Not in CLPD" });
    }

    return res.status(200).json({
      username,
      userId,
      rank: group.role.name
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server failure" });
  }
}
