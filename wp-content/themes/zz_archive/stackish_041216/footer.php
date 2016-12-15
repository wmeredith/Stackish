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
        <p class="navbar-text">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
        <?php wp_footer(); ?>
    </body>
</html>
