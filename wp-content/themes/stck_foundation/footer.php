<footer class="Footer pageFooter">
    <div class="footerRow row expanded">
        <ul class="menu simple">
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
        </ul>
        <div class="copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
