<?php
/*
Template Name: Register
*/
require_once(ABSPATH . WPINC . '/registration.php');
global $wpdb, $user_ID;
//Check whether the user is already logged in
if ($user_ID) {

  // They're already logged in, so we bounce them back to the homepage.

  header( 'Location:' . home_url() );

} else {

  $errors = array();

  if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

    // Check username is present and not already in use
    $username = $wpdb->escape($_REQUEST['username']);
    if ( strpos($username, ' ') !== false ) {
        $errors['username'] = "Sorry, no spaces allowed in usernames";
    }
    if(empty($username)) {
      $errors['username'] = "Please enter a username";
    } elseif( username_exists( $username ) ) {
      $errors['username'] = "Username already exists, please try another";
    }

    // Check email address is present and valid
    $email = $wpdb->escape($_REQUEST['email']);
    if( !is_email( $email ) ) {
      $errors['email'] = "Please enter a valid email";
    } elseif( email_exists( $email ) ) {
      $errors['email'] = "This email address is already in use";
    }

    // Check password is valid
    if(0 === preg_match("/.{6,}/", $_POST['password'])){
      $errors['password'] = "Password must be at least six characters";
    }

    // Check password confirmation_matches
    if(0 !== strcmp($_POST['password'], $_POST['password_confirmation'])){
      $errors['password_confirmation'] = "Passwords do not match";
    }

    // Check terms of service is agreed to
    if($_POST['terms'] != "Yes"){
      $errors['terms'] = "You must agree to Terms of Service";
    }

    if(0 === count($errors)) {

      $password = $_POST['password'];

      $new_user_id = wp_create_user( $username, $password, $email );

      // You could do all manner of other things here like send an email to the user, etc. I leave that to you.

      $success = 1;

      header( 'Location:' . get_bloginfo('url') . '/user/login/?new=1&u=' . $username );

    }
  }
}
get_header(); ?>

<div class="sitewrap">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                <div class="contentwrap">
                    <?php if($errors) { ?>
                        <div class="alert alert-danger alert-dismissible">
                            <div class="banner-content">
                                <?php foreach($errors as $error) { echo $error, '&hellip; '; } ?> Please try again.
                            </div>
                            <a data-stck="closeParent" href="#" title="Close this."><span class="icon-cancel fright"></span></a>
                        </div>
                    <?php } ?>
                    <?php global $wpdb, $user_ID; if (!$user_ID) { ?>
                        <div class="form-group">
                            <h3 class="page-title">Create a Stackish Account</h3>
                        </div>
                        <form id="wp_signup_form" action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="post">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" name="username" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="text" name="email" id="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password">Password (At least 6 characters.)</label>
                                <input type="password" name="password" id="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation">Confirm Password</label>
                                <input type="password" name="password_confirmation" id="password_confirmation" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="terms"><input name="terms" id="terms" type="checkbox" value="Yes">&nbsp;&nbsp;&nbsp;I agree to the fascinating <a href="/terms/">Terms of Service</a>.</label>
                            </div>
                            <div class="form-group">
                                <button type="submit" id="submitbtn" class="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <div class="form-group">
                                <p class="mouseprint">
                                    All fields are required.
                                </p>
                            </div>
                        </form>
                    <?php } else {
                        $user_id = get_current_user_id();
                        $user_info = get_userdata($user_id);
                        $username = $user_info->user_login;
                    ?>
                        <script type="text/javascript">
                            window.location.href = "/user/<?php echo $username; ?>";
                        </script>
                        <p><?php global $current_user; get_currentuserinfo(); echo 'You are logged in as: ' . $current_user->user_login; ?></p>
                        <p><a href="<?php echo wp_logout_url( home_url() ); ?>" title="Logout">Logout</a></p>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
