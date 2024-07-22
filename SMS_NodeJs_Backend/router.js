const router = require("express").Router();
const {Admin} = require("./adminDetails");
const {Organization} = require("./orgDetails");
const {Employee} = require("./EmployeeDetails");
const {ServerInfo} = require("./ServerDetails");
const {Notification} = require("./NotificationDetails");
const bcrypt = require("bcrypt");
const {sequelize}  = require("./database");
const nodemailer = require('nodemailer');
const {otpDetail} = require("./otp");
const {QueryTypes} = require("sequelize");
const {ContactSuggestion} = require("./contactUs");



//API for admin 
const getAllAdmin = async (req,res) => {
    const admins = await Admin.findAll({});
    res.json(admins);
};

const getAdmin = async (req,res) => {
    const id = req.params.adminId;
    const admin = await Admin.findByPk(id);
    res.send(admin);
};

const saveAdmin = async (req, res) => {
    try {
        const data = req.body;
        
        // Using Sequelize as an example, assuming Admin is a Sequelize model
        const newCreatedAdmin = await Admin.create(data);

        // Send the newly created admin as a JSON response
        res.json(newCreatedAdmin);
    } catch (error) {
        // Handle errors appropriately, for example, sending an error response
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteAdmin = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await Admin.destroy({where:{CompanyId:id}});
    res.json(deleteCount);
};

const updateAdmin = async (req,res) => {
    const data = req.body;
    const updateObject = {...data};
    delete updateObject.AdminId;
    const updateCount = await Admin.update(updateObject,{
        where : {AdminId:data.AdminId},
    });
    res.json(updateCount);
};

//==================================================================================================
//API for Organization

const getAllOrg = async (req,res) => {
    const organizations = await Organization.findAll({});
    res.json(organizations);
};

const getOrg = async (req,res) => {
    const id = req.params.orgId;
    const organization = await Organization.findByPk(id);
    res.send(organization);
};

const saveOrg= async (req,res) => {
  try {
    // Attempt to insert the record into the database
    // Your database insert code here
      const data = req.body;
      const newCreatedOrg = await Organization.create(data);
      res.json(newCreatedOrg);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
        console.error('Duplicate entry error: The organization ID already exists.');
        // Handle the error gracefully, such as notifying the user or logging it
    } else {
        console.error('An error occurred:', error);
    }
  }
};

const deleteOrg = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await Organization.destroy({where:{id:id}});
    res.json(deleteCount);
};

const updateOrg = async (req,res) => {
    const data = req.body;
    const updateObject = {...data};
    delete updateObject.id;
    const updateCount = await Organization.update(updateObject,{
        where : {id:data.id},
    });
    res.json(updateCount);
};

//==================================================================================================
//API for Employee 

const getAllEmp = async (req,res) => {
    const emp = await Employee.findAll({});
    res.json(emp);
};

const getEmp = async (req,res) => {
    const id = req.params.empId;
    const emp = await Employee.findByPk(id);
    res.send(emp);
};

const saveEmp = async (req,res) => {
    const data = req.body;
    const newCreatedemp = await Employee.create(data);
    res.json(newCreatedemp);
};

const deleteEmp = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await Employee.destroy({where:{id:id}});
    res.json(deleteCount);
};

const updateEmp = async (req,res) => {
  const data = req.body;
  const updateObject = {...data};
  delete updateObject.id;
  const updateCount = await Employee.update(updateObject,{
      where : {id:data.id},
  });
  res.json(updateCount);
};

//==================================================================================================
//API for Server

const getAllserver = async (req,res) => {
    const server = await ServerInfo.findAll({});
    res.json(server);
};

const getFailedInactiveServer = async (req, res) => {
  try {
      const servers = await ServerInfo.findAll({
          where: {
              status: ['Failed', 'Inactive'] // Filter by specific statuses
          }
      });
      res.json(servers);
  } catch (error) {
      console.error('Error fetching servers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getServer = async (req,res) => {
    const id = req.params.ServerId;
    const server= await ServerInfo.findByPk(id);
    res.send(server);
};

const saveServer = async (req, res) => {
  const data = req.body;
  try {
      // Remove the 'id' field from the data object
      delete data.id;
      // Create a new server record without specifying the 'id' field
      const newCreatedServer = await ServerInfo.create(data);
      res.json(newCreatedServer);
  } catch (error) {
      console.error('Error creating server:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteServer = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await ServerInfo.destroy({where:{id:id}});
    res.json(deleteCount);
};

const updateServer = async (req,res) => {
  const data = req.body;
  const updateObject = {...data};
  delete updateObject.id;
  const updateCount = await ServerInfo.update(updateObject,{
      where : {id:data.id},
  });
  res.json(updateCount);
};

//==================================================================================================
//API for Notification

const getAllNotification = async (req,res) => {
    const notification = await Notification.findAll({});
    res.json(notification);
};

const getNotification = async (req,res) => {
    const id = req.params.NotificationId;
    const notification= await Notification.findByPk(id);
    res.send(notification);
};

const saveNotification = async (req,res) => {
    const data = req.body;
    const newCreatednotification= await Notification.create(data);
    res.json(newCreatednotification);
};

//==================================================================================================
//API for System Login

const login = (req,res) => {
    const data=req.body;
    if(data.username==="sysadmin" && data.password==="sysadmin"){
        res.json({token:"thisismytoken"});
    } else{
        res.status(401).send("Invalid Credintial");
    }
};

router.post("/auth/login", login);

//==================================================================================================
//API for Joining Server and Notification

ServerInfo.hasMany(Notification, { foreignKey: 'id' });
// Define association in NotificationDetails model
Notification.belongsTo(ServerInfo, { foreignKey: 'id' });

  router.get('/join-tables', async (req, res) => {
    try {
      const query = `
        SELECT *
        FROM ServerDetails
        INNER JOIN NotificationDetails ON ServerDetails.id = NotificationDetails.id
      `;
      
      const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.json(results);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//==================================================================================================
//API for Admin Login and Registration

router.post('/adminlogin', async (req, res) => {
  const { adminId, password } = req.body;

  try {
    if (!adminId || !password) {
      return res.status(400).json({ error: 'Both adminId and password are required' });
    }

    // Find the admin by adminId
    const admin = await Admin.findOne({
      where: {
        AdminId: adminId,
      },
    });

    if (admin) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, admin.Password);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful!' });
        
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'singhmantuleshpgmm@gmail.com',
    pass: 'baqzllndftzewxly',
  },
});

router.post('/send-otp', async (req, res) => {
  const { EmailID } = req.body;

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log("otp", otp);

  // await otpDetail.create({
  //   EmailID: EmailID, // Update the field name here
  //   OTP: otp
  // });

  const query = "INSERT INTO otp (EmailID,OTP) VALUES (:EmailID, :otp)";
  const replacements = { EmailID: EmailID, otp: otp };
  await sequelize.query(query, {
    replacements,
    type: QueryTypes.INSERT,
  });

  try {

    // Send OTP via email
    const mailOptions = {
      from: 'singhmantuleshpgmm@gmail.com',
      to: EmailID,
      subject: 'Registration OTP',
      text: `Your OTP for registration is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("info", info, "error", error);
        return res.status(500).json({ message: error });
      }
      res.json({ message: 'OTP sent successfully' });
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error during registration' });
  }
});

router.post('/register', async (req, res) => {
  const { AdminId, AdminName, Password, EmailID, Contact, OTP } = req.body;
  console.log(req.body);

  try {
    // Validation checks
    if (!AdminId || !AdminName || !Password || !EmailID || !Contact ||!OTP) {
      return res.status(400).json({ error: 'All fields are required for registration' });
    }

    const otp = await otpDetail.findOne({
      where: {
        EmailID: EmailID,
        OTP: OTP
      },
    });

    if (!otp) {
      return res.status(400).json({ error: 'Please Provide Correct OTP' });
    }

    // Check if the adminId is already taken
    const existingAdmin = await Admin.findOne({
      where: {
        AdminId: AdminId,
      },
    });

    if (existingAdmin) {
      return res.status(400).json({ error: 'AdminId is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new admin record with hashed password
    const newAdmin = await Admin.create({
      AdminId: AdminId,
      AdminName: AdminName,
      Password: hashedPassword, // Store the hashed password
      EmailID: EmailID,
      Contact: Contact,
    });

    res.status(200).json({ message: 'Registration successful!', admin: newAdmin });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map((e) => e.message);
      return res.status(400).json({ error: 'Validation error', details: validationErrors });
    }

    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//=================================================================================================================
//API for Employee Login and Employee Page 
Employee.hasMany(ServerInfo, { foreignKey: 'EmpId' });

ServerInfo.belongsTo(Employee, { foreignKey: 'EmpId' });

router.post('/emplogin', async (req, res) => {
  const { empId, password } = req.body;

  try {
    if (!empId || !password) {
      return res.status(400).json({ error: 'Both empId and password are required' });
    }

    // Find the employee by empId
    const emp = await Employee.findOne({
      where: {
        EmpId: empId,
      },
    });

    if (emp) {
      // Compare the provided password with the password in the database
      if (password === emp.Password) {
        res.status(200).json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function joinTablesForEmpId(req, res) {
  try {
    // Retrieve empId from session
    const empId = req.params.id;
    // const empId  = "E101";

    if (!empId) {
      throw new Error('EmpId is undefined');
    }

    // Query ServerDetails table with association to NotificationDetails
    const query = `
      SELECT *
      FROM ServerDetails AS sd
      INNER JOIN NotificationDetails AS nd ON sd.id = nd.id
      WHERE sd.EmpId = :empId
    `;

    // Executing the query using Sequelize
    const results = await sequelize.query(query, {
      replacements: { empId: empId },
      type: sequelize.QueryTypes.SELECT
    }); 

    // Sending the results as JSON response
    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteRecordById(req, res) {
  try {
    // Retrieve id from request parameters
    const recordId = req.params.id;

    if (!recordId) {
      throw new Error('Record ID is undefined');
    }

    // Perform delete operation using the record ID
    const deletedRows = await ServerInfo.destroy({ where: { id: recordId } });

    if (deletedRows > 0) {
      res.json({ message: 'Delete operation successful' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    console.error('Error executing delete operation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateNotificationAndServerDetails = async (req, res) => {
  try {
    const updatedData = req.body;

    if (!updatedData) {
      throw new Error('Updated data is missing');
    }

    const { id: recordId, ServerId, EmpId, OrgId, ServerName, IPAddress, Status, Reason, NotificationId, Date } = updatedData;

    if (!recordId) {
      throw new Error('Record ID is undefined');
    }

    console.log(recordId);

    const transactionResult = await sequelize.transaction(async (t) => {
      // Update ServerDetails
      const serverUpdateResult = await ServerInfo.update({
        ServerId,
        EmpId,
        OrgId,
        ServerName,
        IPAddress,
        Status,
        Reason
      }, { where: { id: recordId }, transaction: t });

      // Update NotificationDetails
      const notificationUpdateResult = await Notification.update({
        NotificationId,
        Date
      }, { where: { id: recordId }, transaction: t });

      return [serverUpdateResult, notificationUpdateResult];
    });
    res.json({ message: 'Update operation successful' });
  } catch (error) {
    console.error('Error executing update operation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



router.get("/join-tables-empid/:id", joinTablesForEmpId);
router.put("/updatenotificationandserverdetails", updateNotificationAndServerDetails);
router.delete("/delete-record/:id", deleteRecordById);


Notification.hasMany(ServerInfo, { foreignKey: 'id' });
ServerInfo.belongsTo(Notification, { foreignKey: 'id' });

// Use callback for findAll
Notification.findAll({
  include: [{
    model: ServerInfo,
    required: true, // Inner join
  }],
}, (queryError, results) => {
  if (queryError) {
    console.error('Error executing query:', queryError);
    return;
  }
  console.log('Query results:', results);
});

router.get("/servernotification", (req, res) => {
  Notification.findAll({
    include: [{
      model: ServerInfo,
      required: true, // Inner join
    }],
  }, (queryError, results) => {
    if (queryError) {
      console.error('Error executing query:', queryError);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

//=====================================================================================
const getContactSuggestion = async (req, res) => {
  const Suggesion = await ContactSuggestion.findAll({});
  res.json(Suggesion);
};

const createContactSuggestion = async (req, res) => {
  const data = req.body;

try {
    const newCreatedSuggestion = await ContactSuggestion.create(data);
    res.json(newCreatedSuggestion);
    // Handle success
} catch (error) {
    console.log("Error creating suggestion:", error);
    // Handle error
}  
};

router.get("/getContactSuggestion", getContactSuggestion);
router.post("/createContactSuggestion", createContactSuggestion);

router.get("/admin",getAllAdmin);
router.get("/admin/:adminId",getAdmin);
router.post("/admin",saveAdmin);
router.delete("/admin/:id",deleteAdmin);
router.put("/admin",updateAdmin);

router.get("/organization",getAllOrg);
router.get("/organization/:orgId",getOrg);
router.post("/organization",saveOrg);
router.delete("/organization/:id",deleteOrg);
router.put("/organization",updateOrg);

router.get("/employee",getAllEmp);
router.get("/employee/:empId",getEmp);
router.post("/employee",saveEmp);
router.delete("/employee/:id",deleteEmp);
router.put("/employee",updateEmp);

router.get("/server",getAllserver);
router.get("/serverFailedInactive",getFailedInactiveServer);
router.get("/server/:ServerId",getServer);
router.post("/server",saveServer);
router.delete("/server/:id",deleteServer);
router.put("/server",updateServer);

router.get("/notifications",getAllNotification);
router.get("/notifications/:NotificationId",getNotification);
router.post("/notifications",saveNotification);


module.exports = router;