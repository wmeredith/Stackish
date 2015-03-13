<?php get_header(); ?>
  
    <main class="page-main">
      <?php if(($_GET['login']) == 'failed') { ?>
        <div class="alert-banner">
          Whelp, that didn't work. Try again. <a href="/lost-pass/" title="Reset your account password.">Lost your password?</a>
          <a data-stck="closeParent" href="#" title="Close this."><span class="icon-cancel fright"></span></a>
        </div>
      <?php } ?>
      <?php
        require_once(ABSPATH . WPINC . '/registration.php');
        global $wpdb, $user_ID;
        if (!$user_ID) { ?>
          
          <div class="sign-up-column">
            <?php if(get_option('users_can_register')) { ?>
              <h3 class="form-title">Create an Account</h3>
              <div id="result"></div> <!-- To hold validation results -->
              <form action="<?php global $post; echo get_permalink($post->ID); ?>" method="post">
                <ul class="form-list">
                  <li>
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" />
                  <li>
                    <label for="email">E-mail</label>
                    <input type="text" name="email" id="email" />
                  <li>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                  <li>
                    <input type="hidden" name="sent" value="true" />
                    <input type="submit" name="submit" id="submit" value="Create Account" />
                </ul>
              </form>

              <?php
                // Registration routine
                if(isset($_POST['sent']) && $_POST['sent'] == 'true') { // has the form been submitted?
                  // Sanitize
                  $password = $_POST['password'];
                  $username = $_POST['username'];
                  $email = $_POST['email'];     
                
                  // Create the user
                  wp_insert_user(array(
                    'user_pass' => $password,
                    'user_login'=> $username,
                    'user_email' => $email,
                    'role' => 'stacker')
                  );
                  
                  // Redirect the user
                  wp_redirect('Location:' . home_url() . '/user/'  . $username);  
                  exit();
              }
              ?>
            <?php } else { ?>
              <p>Registration is currently disabled.</p>
            <?php } ?>
          </div>
          
          <div class="login-column">
            <h3 class="form-title">Login</h3>
            <form name="loginform" id="loginform" action="<?php echo get_option('home'); ?>/wp-login.php" method="post">
              <ul class="form-list">
                <li>
                  <label>Username</label>
                  <input type="text" name="log" id="user_login" class="input" value="" size="20" tabindex="10" />
                <li>
                  <label>Password</label>
                  <input type="password" name="pwd" id="user_pass" class="input" value="" size="20" tabindex="20" />
                  <label><input name="rememberme" type="checkbox" id="rememberme" value="forever" tabindex="90" /> Remember Me</label>
                <li class="submit">
                  <input type="submit" name="wp-submit" id="wp-submit" class="button-primary" value="Log In" tabindex="100" />
                  <input type="hidden" name="redirect_to" value="<?php echo get_option('home'); ?>/wp-admin/" />
                  <input type="hidden" name="testcookie" value="1" />
              </ul>
            </form>
            <p id="nav">
              <a href="/lost-pass/" title="Reset your account password.">Lost your password?</a>
            </p>
          </div>
        <?php 
        } else { 
          $user_id = get_current_user_id();
          $user_info = get_userdata($user_id);
          $username = $user_info->user_login; ?>
          <script type="text/javascript">
            window.location.href = "/u/<?php echo $username; ?>";
          </script>
        ?>
           <p><?php global $current_user; get_currentuserinfo(); echo 'You are logged in as: ' . $current_user->user_login; ?></p> 
           <p><a href="<?php echo wp_logout_url( home_url() ); ?>" title="Logout">Logout</a></p>
        <?php }
      ?>
    </main>

<?php get_footer(); ?>