<div class="sitewrap">
    <footer class="footer site-footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <ul class="footer-nav">
                        <?php
                          wp_nav_menu(
                            array(
                              'theme_location'  => 'footer_menu',
                              'container'       => false,
                              'menu_class'      => 'menu',
                              'items_wrap' => '%3$s'
                            )
                          );
                        ?>
                        <li>
                            <a title="Log out of this account: <?php global $user_identity; get_currentuserinfo(); echo $user_identity; ?>" href="<?php echo wp_logout_url( home_url() ); ?>">Logout</a>
                        </li>
                    </ul>
                    <div class="copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></div>
                </div>
            </div>
        </div>
    </footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
