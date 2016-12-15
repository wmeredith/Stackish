<?php
/*
Template Name: Lost Pass
*/
get_header(); ?>

<div class="sitewrap">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                <div class="contentwrap">
                    <?php if(($_GET['reset']) == 'true') { ?>
                        <div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            Check your email for a password reset link.
                        </div>
                    <?php } ?>
                    <?php global $user_ID, $user_identity; get_currentuserinfo(); if (!$user_ID) { ?>
                        <div class="alert alert-danger">
                            <p>!!! THIS NEEDS TESTING ON A LIVE SERVER !!!</p>
                        </div>
                        <form method="post" action="<?php echo site_url('wp-login.php?action=lostpassword', 'login_post') ?>" class="wp-user-form">
                            <div class="form-group">
                                <h3 class="page-title">Password Reset</h3>
                            </div>
                            <div class="form-group">
                                <label for="user_login">Username or Email</label>
                                <input type="text" name="user_login" id="user_login" class="form-control" />
                            </div>
                            <div class="form-group">
                                <?php do_action('login_form', 'resetpass'); ?>
                                <input type="submit" name="user-submit" value="<?php _e('Reset My Password'); ?>" class="reset-submit btn btn-primary" />
                                <input type="hidden" name="redirect_to" value="<?php header_remove(); echo $_SERVER['REQUEST_URI']; ?>?reset=true" />
                                <input type="hidden" name="user-cookie" value="1" />
                            </div>
                        </form>
                    <?php } else { ?>
                        <h3 class="form-title">Password Reset</h3>
                        <p>Uh, you&rsquo;re already logged in as <strong><?php echo $user_identity; ?></strong></p>
                        <p><a href="<?php echo wp_logout_url('index.php'); ?>">Log out</a> and come back to reset your password.</p>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
