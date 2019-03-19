# hw2-Zyc1
In this assignment you will create a web page that demonstrates your understanding of basic JavaScript functionality. In the previous assignment we created a registration page that a user could use to create a new account on our social networking service. Now we create a semi-functional main page for our web application. The main page will consist of "posts" that contain recent blob postings and picture uploads. A "post" can be an image, a block of text, or both.

Use Chrome as your standard supported browser.

Main Page Requirements
The main page will contain the user's feed. The feed consists of all of the user's posted articles along with all of the articles of the users that they are following. In this assignment we make a web page that displays a semi-static feed. The dynamic aspect is that the images in the articles will periodically change.

Use a <table> or similar to layout a regular grid of "posts", with at least two columns. There should be a sufficient number of rows so that scrolling down (in the main window of the browser) is necessary to view them all.
Each post should either be a block of text or an image with a block of text. At least half of the posts should have images. For the text you can use lorem ipsum text. Sample images can also be found online.
For each post that contains an image, use an interval to periodically cycle through different images. Each post should have a distinct set of images. The interval times should be a different random number of seconds between 1 and 5 inclusive for each post.
Each image post contains a button labeled "Stop" to stop the interval for that post. Once stopped, the button label changes to "Start" and should then start the interval when clicked. All intervals are started by default. When restarting an interval there should be a new random delay time for that interval.
There should be a link to navigate to the user's profile page
The table should be non-trivially styled using CSS
A "trivial" style would be only setting, e.g., the border of the table. Instead we want to see several styles for the table, which should include styling the table data cells. The styles should exist in a separate css file.

Profile Page Requirements
The profile page will allow the user to update their profile. Do not use a form for this page. The page should contain the following:

display name
email address
phone number
zipcode
password
password confirmation
Update button to submit the changes
Link to return to main page
For each field there should be an input along side the current value, e.g., something like this

Zip Code: 
77005
The page will load with hardcoded values for each field. The submit button will determine which fields have changed and provide a message to the user informing which fields are being updated. After the message is displayed, the updated values are displayed instead of the old values and the input fields should all be cleared. Be sure to validate the inputs (and perform password match) and inform the user of incorrect entries before updating values on the screen.

Do not use JavaScript alerts for passing information to the user. Alerts pause execution and are therefore "not nice" to use. Instead you could use a div or span that appears with informational messages.

Style the profile page (you may include styles in the same file as for the main page).
