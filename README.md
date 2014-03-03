PointGuard is a system in which you can email progress reports to a certain email address, which will then upload them to this deployed meteor application. 

To set up, you need to create an email address using cloudmailin that supports attachments and uploads them to an S3 bucket. The attachment should be a progress report. Point that email address to [deployed-app-name].meteor.com/inbound. Whoever the progress report is addressed to, e.g. "Matthew Kaufer", will be the account user able to access it. For instance, the only person that could view the progress report addressed to "Matthew Kaufer" would be somebody logged in as "Matthew Kaufer". 

This was all created at HackMIT Blueprint, a 12 hour hackathon. Feel free to fork this however you like. As it was only created in 12 hours, the only progress report format it supports is the one attached. Again, feel free to fork this if you'd like to program it such that it can support a variety of progress reports. 

The cloudmailin plan needed to upload attachments to S3 is the 'Starter' plan. 

That is all.

Thanks.
