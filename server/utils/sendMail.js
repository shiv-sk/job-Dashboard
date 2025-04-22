const nodemailer = require("nodemailer");
exports.sendConfirmationMail = async(userEmail , organizationMail , jobTitle , userName , orgName)=>{
    console.log("the username and password from env: " , process.env.USER);
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:process.env.USER,
            pass:process.env.PASS
        }
    });
    
    const userMailOptions = {
        from:"natsudragneel771990@gmail.com",
        to:userEmail,
        subject:"Application is submitted",
        text:`Dear ${userName},
        Thank you for applying to the ${jobTitle} position at ${orgName}. We have successfully received your application.
        Here are the details of your application:
        - Position: ${jobTitle}
        - Company: ${orgName}

        Our hiring team is reviewing your profile and will contact you shortly if we feel you are a good match for the role. In the meantime, you can visit your profile to track the status of your application.

        If you have any questions or need to update your information, feel free to contact us at natsudragneel771990@gmail.com.

        Thank you again for your interest in joining our team, and we wish you the best of luck in the hiring process!

        Best regards,  
        Job-DashBoard  
        Job-DashBoard.com  
        natsudragneel771990@gmail.com`,
    };
    const organizationMailOptions = {
        from:"natsudragneel771990@gmail.com",
        to:organizationMail,
        subject:`new application is received `,
        text:`Dear ${orgName},

        We wanted to inform you that a new application has been submitted for your job posting: ${jobTitle}.

        Applicant details:
        - Name: ${userName}
        - Email: ${userEmail}
        - Resume: you will find in application

        You can review the full application on the employer dashboard.

        If you have any questions or need assistance reviewing applications, please feel free to contact us at natsudragneel771990@gmail.com.

        Thank you for using Job-DashBoard to find your next great hire.

        Best regards,  
        Job-DashBoard  
        Job-DashBoard.com  
        natsudragneel771990@gmail.com`,
    };

   try {
    const userInfo = await transport.sendMail(userMailOptions);
    // console.log("User confirmation email sent: ", userInfo);
   } catch (error) {
    console.error("Error sending user confirmation email: ", error);
   }

   try {
    const orgInfo = await transport.sendMail(organizationMailOptions);
    // console.log("Organization notification email sent: ", orgInfo);
   } catch (error) {
    console.error("Error sending organization notification email: ", error);
   }
   
}


//application status updating notification
exports.applicationScheduledStatus = async(userEmail , appliedDate , jobTitle , dateTime)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    })

    const userOptions = {
        from:"Job-DashBoard",
        to:userEmail,
        subject:`Interview Scheduled Notification for ${jobTitle}`,
        html:`
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3>Interview Scheduled Notification</h3>
        <p>Dear Candidate,</p>
        <p>We are pleased to inform you that your application for the role of <strong>${jobTitle}</strong>, applied on <strong>${appliedDate}</strong>, has been shortlisted.</p>
        <p>Your interview has been scheduled on <strong>${dateTime}</strong>. Please ensure you are available with a suitable device for the interview process.</p>
        <p>We will inform you of any changes to the schedule. Thank you for your interest, and we wish you the best of luck!</p>
        <p>Best Regards,</p>
        <p><em>[Job-DashBoard]</em></p>
        <h4 style="color: green;">All The Best 👍</h4>
        </div>
        `
    }
    let sentMessage;
    try {
        sentMessage = await transport.sendMail(userOptions);
    } catch (error) {
        console.error("Error while sending interview notification email! " , error);
        return { success: false, error: error.message };
    }
    return sentMessage;
}

exports.applicationRejectedStatus = async(userEmail , appliedDate , jobTitle )=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    })

    const userOptions = {
        from:"Job-DashBoard",
        to:userEmail,
        subject:`Application Status Update for ${jobTitle}`,
        html:`
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3>Application Status Update</h3>
        <p>Dear Candidate,</p>
        <p>Thank you for your interest in the position of <strong>${jobTitle}</strong> with us. We appreciate the time and effort you invested in applying for the role.</p>
        <p>After careful consideration, we regret to inform you that your application, submitted on <strong>${appliedDate}</strong>, has not been selected for further consideration at this time.</p>
        <p>We encourage you to apply for future opportunities that suit your experience and skills. Best of luck in your job search!</p>
        <p>Best Regards,</p>
        <p><em>[Job-DashBoard]</em></p>
        <h4 style="color: green;">All The Best 👍</h4>
        </div>
        `
    }
    let sentMessage;
    try {
        sentMessage = await transport.sendMail(userOptions);
    } catch (error) {
        console.error("Error while sending interview notification email! " , error);
        return { success: false, error: error.message };
    }
    return sentMessage;
}