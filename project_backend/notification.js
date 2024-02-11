const notificationRouter =  require('express').Router();
const { as } = require("pg-promise");
const db = require("./db.js");

let response;
// Connect to your database (replace with your connection string)

// Define a notification model (adjust fields as needed)

router.route("/notification").get((req, res) => {
    // const bearerHeader = req.headers["authorization"];
    // if (!bearerHeader) {
    //     return res.status(403).json({ message: "No token provided" });
    // }
    // const decoded = jwt.verify(bearerHeader, jwtSecret);

    // let id = decoded["userId"];
    // console.log(decoded);
    let id = req.user["userId"];


    db.any(`SELECT * FROM "Notificatons" n 
            INNER JOIN "UserNotifications" un on "un.notificationId = n.notificationId"
            INNER JOIN "User" u on "u.userId = un.userId"
            WHERE "userId" = $1`, [id])
        .then((data) => {
            response = {
                message: "User profile retrieved successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

console.log(response);

/*
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

// Route to retrieve a user's notifications
app.get('/notifications/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); // Sort by latest first
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


app.get('/notifications/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Use Supabase query to fetch notifications
      const { data, error } = await supabase
        .from('notifications') // Replace with your notification table name
        .select('*') // Adjust selected fields if needed
        .eq('userId', userId) // Filter by user ID
        .order('created_at', { ascending: false }); // Sort by latest first
  
      if (error) throw error;
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching notifications' });
    }
  });
  */