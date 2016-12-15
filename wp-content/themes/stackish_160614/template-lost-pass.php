<?php
/*
Template Name: Lost Pass
*/
get_header(); ?>
  
    <main class="page-main">
      <?php if(($_GET['reset']) == 'true') { ?>
        <div class="alert-banner">
          <div class="banner-content">
            Check your email for a password reset link.
          </div>
          <a data-stck="closeParent" href="#" title="Close this."><span class="icon-cancel fright"></span></a>
        </div>
      <?php } ?>
      <?php global $user_ID, $user_identity; get_currentuserinfo(); if (!$user_ID) { ?>
        <h3 class="form-title">Password Reset</h3>

        <div class="sign-up-column">
          <form method="post" action="<?php echo site_url('wp-login.php?action=lostpassword', 'login_post') ?>" class="wp-user-form">
            <ul class="form-list">
              <li><p>This needs testing on a live server.</p></li>
              <li>
                <label for="user_login">Enter username/email:</label>
                <input type="text" name="user_login" id="user_login" />
              <li>
                <?php do_action('login_form', 'resetpass'); ?>
                <input type="submit" name="user-submit" value="<?php _e('Reset my password'); ?>" class="reset-submit" />
                <input type="hidden" name="redirect_to" value="<?php header_remove(); echo $_SERVER['REQUEST_URI']; ?>?reset=true" />
                <input type="hidden" name="user-cookie" value="1" />
            </ul>
          </form>
        <?php } else { ?>
          <h3 class="form-title">Welcome, <?php echo $user_identity; ?></h3>
            <p>You&rsquo;re logged in as <strong><?php echo $user_identity; ?></strong></p>
            <p><a href="<?php echo wp_logout_url('index.php'); ?>">Log out</a></p>
          </div>
        <?php } ?>
      </div>
    </main>


<?php get_footer(); ?>
