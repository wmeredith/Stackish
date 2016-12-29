<!-- This sets the $curauth variable -->
<?php
    if(isset($_GET['author_name'])) : $stckauth = get_userdatabylogin($author_name);
    else : $stckauth = get_userdata(intval($author));
    endif;  ?>

    <?php echo $stckauth->user_description; ?>

<div id="stckToolbar" class="sidebar">
    <ul>
        <li class="text-center">
            <div class="avatar-wrap">
                <p>
                    <img class="large-avatar" src="/wp-content/uploads/2016/12/IMG_0412.jpg" title="<?php echo $stckauth->nickname; ?>">
                </p>
            </div>
            <h1 class="sidebar-heading sidebar-heading-author"><?php echo $stckauth->nickname; ?></h1>
        </li>
        <li class="text-center">
            <p>
                Stacking since February, 2016
            </p>
        </li>
        <!-- if user can follow -->
            <!-- if user is !following -->
                <!-- <li class="text-center">
                    <button class="btn btn-primary btn-sm" href="" title="Start Following <?php echo $stckauth->nickname; ?>">
                        <span aria-hidden="true" class="icon-check-empty"></span>Start Following&nbsp;&nbsp;
                    </button>
                </li> -->
            <!--endif user is !following-->
            <!-- if user is following -->
                <!-- <li class="text-center">
                    <button class="btn btn-default btn-sm" href="" title="Stop Following <?php echo $stckauth->nickname; ?>">
                        <span aria-hidden="true" class="icon-check"></span> Following&nbsp;&nbsp;
                    </button>
                </li> -->
            <!--endif user is following-->
        <!--endif user can follow-->

        <!-- if user can edit this profile-->
            <li class="text-center">
                <button class="btn btn-default btn-sm" href="" title="Edit Profile">
                    <span aria-hidden="true" class="icon-edit"></span> Edit Profile
                </button>
            </li>
        <!--endif user can edit-->
        <br/>
        <li>
            <h5 class="sidebar-heading">Description</h5>
            <ul>
                <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </li>
            </ul>
        </li>
        <li>
            <h5 class="sidebar-heading">Activity</h5>
            <ul>
                <li>
                    Following: 4,166
                </li>
                <li>
                    Followers: 45
                </li>
                <li>
                    Stacks Created: 11
                </li>
                <li>
                    <span aria-hidden="true" class="icon-star gold-star"></span>
                    <span class="sr-only">Gold Stars</span>
                    Received: 43
                </li>
                <li>
                    <span aria-hidden="true" class="icon-star gold-star"></span>
                    <span class="sr-only">Gold Stars</span>
                    Given: 109
                </li>


            </ul>
        </li>
        <li>
            <h5 class="sidebar-heading">Else(where)</h5>
            <ul>
                <li>
                    <a href="<?php echo $stckauth->user_url; ?>" title="Go to <?php echo $stckauth->nickname; ?>'s web page.'"><?php echo $stckauth->user_url; ?></a>
                </li>
                <li>
                    <div class="btn-group">
                        <button class="btn btn-default btn-sm" href="" title="<?php echo $stckauth->nickname; ?> on Facebook">
                            <span aria-hidden="true" class="icon-facebook"></span>
                            <span class="sr-only">Facebook</span>
                        </button>
                        <button class="btn btn-default btn-sm" href="" title="<?php echo $stckauth->nickname; ?> on Twitter">
                            <span aria-hidden="true" class="icon-twitter"></span>
                            <span class="sr-only">Twitter</span>
                        </button>
                        <button class="btn btn-default btn-sm" href="" title="<?php echo $stckauth->nickname; ?> on Pinterest">
                            <span aria-hidden="true" class="icon-pinterest"></span>
                            <span class="sr-only">Pinterest</span>
                        </button>
                        <button class="btn btn-default btn-sm" href="" title="<?php echo $stckauth->nickname; ?> on Dribbble">
                            <span aria-hidden="true" class="icon-dribbble"></span>
                            <span class="sr-only">Dribbble</span>
                        </button>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</div>
