
  <div class="push"></div>
</div><!-- /wrapper -->
<nav class="navbar navbar-inverse navbar-bottom navbar-fixed" role="navigation">
  <div class="container">
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">     
      <ul class="nav navbar-nav navbar-left">
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
      <ul class="nav navbar-nav navbar-right">
        <p class="navbar-text">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container -->
</nav>

<?php wp_footer(); ?>

</body>
</html>