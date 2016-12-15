<?php
/*
Template Name: Login
*/
get_header(); ?>
  <main class="page-main">
    <?php if(($_GET['login']) == 'failed') { ?>
      <div class="alert-banner">
        That didn't work. Try again. <a href="/lost-pass/" title="Reset your account password.">Lost your password?</a>
        <a data-stck="closeParent" href="#" title="Close this."><span class="icon-cancel fright"></span></a>
      </div>
    <?php } elseif(($_GET['new']) == '1') { ?>
      <div class="alert-banner">
        Welcome! Login below with your new credentials.
        <a data-stck="closeParent" href="#" title="Close this."><span class="icon-cancel fright"></span></a>
      </div>
    <?php } ?>
    <?php global $wpdb, $user_ID;
    if (!$user_ID) { ?>
      <h3 class="form-title">Existing User Login</h3>
      <div class="login-column">
        <form name="loginform" id="loginform" action="<?php echo get_option('home'); ?>/wp-login.php" method="post">
          <div class="form-group">
            <label>Username</label>
            <input type="text" name="log" id="user_login" value="" size="20" tabindex="10" class="form-control"/>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="pwd" id="user_pass" value="" size="20" tabindex="20" class="form-control"/>
          </div>
          <div class="form-group">
            <label><input name="rememberme" type="checkbox" id="rememberme" value="forever" tabindex="90"/>&nbsp;&nbsp;&nbsp;Remember Me</label>
          </div>
          <div class="form-group">
            <button type="submit" name="wp-submit" id="wp-submit" class="btn btn-primary" tabindex="100">
              Log In
            </button>
            <input type="hidden" name="redirect_to" value="<?php echo get_option('home'); ?>/wp-admin/" />
            <input type="hidden" name="testcookie" value="1" />
          </div>
        </form>
        <p id="nav">
          <a href="/lost-pass/" title="Reset your account password.">Lost your password?</a>
        </p>
      </div>
    <?php } else { 
      $user_id = get_current_user_id();
      $user_info = get_userdata($user_id);
      $username = $user_info->user_login; ?>
      <script type="text/javascript">
        window.location.href = "/user/<?php echo $username; ?>";
      </script>
      <p><?php global $current_user; get_currentuserinfo(); echo 'You are logged in as: ' . $current_user->user_login; ?></p> 
      <p><a href="<?php echo wp_logout_url( home_url() ); ?>" title="Logout">Logout</a></p>
    <?php } ?>
  </main>
<?php get_footer(); ?>