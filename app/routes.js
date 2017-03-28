module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    
    app.get('/signup', function(req, res) {

        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    // Change to comments.ejs
    
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user 
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
     app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',  // Change to comments
        failureRedirect : '/login', 
        failureFlash : true
    }));
    
    module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
};


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
