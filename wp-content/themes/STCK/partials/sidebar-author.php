<!-- This sets the $curauth variable -->
<?php
    if(isset($_GET['author_name'])) : $stckauth = get_userdatabylogin($author_name);
    else : $stckauth = get_userdata(intval($author));
    endif;  ?>

    <?php echo $stckauth->user_description; ?>

<div id="stckToolbar" class="sidebar sidebar-stack-statbar">
    <div class="row">
        <div class="col-md-12">
            <ul>
                <li>
                    <div class="avatar-wrap">
                        <p>
                            <img class="large-avatar" src="/wp-content/uploads/2016/12/IMG_0412.jpg" title="<?php echo $stckauth->nickname; ?>">
                        </p>
                    </div>
                    <ul>
                        <li class="text-center">
                            <h4><?php echo $stckauth->nickname; ?></h4>
                        </li>
                        <li class="text-center">
                            <h4><a href="<?php echo $stckauth->user_url; ?>" title="Go to <?php echo $stckauth->nickname; ?>'s web page.'"><?php echo $stckauth->user_url; ?></a></h4>
                        </li>
                        <li>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
