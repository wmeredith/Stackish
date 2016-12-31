<?php
    if(isset($_GET['author_name'])) : $stckauth = get_userdatabylogin($author_name);
    else : $stckauth = get_userdata(intval($author));
    endif;
?>
<div id="stckToolbar" class="sidebar">
    <ul>
        <li class="text-center">
            <div class="avatar-wrap">
                <p>
                    <img class="large-avatar" src="/wp-content/uploads/2016/12/IMG_0412.jpg" title="<?php echo $stckauth->nickname; ?>">
                </p>
            </div>

        </li>
        <li class="text-center">
            <h1 class="sidebar-heading sidebar-heading-author"><?php echo $stckauth->nickname; ?></h1>
            <p class="mouseprint">
                Stacking since February, 2016
            </p>

        </li>
        <!-- if user can follow -->
            <!-- if user is !following -->
                <!-- <li class="text-center">
                    <button class="btn btn-primary btn-sm" href="" title="Start Following <?php echo $stckauth->nickname; ?>">
                        <span aria-hidden="true" class="icon-check-empty"></span> Start Following&nbsp;&nbsp;
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
                <button id="stckProfileEdit" class="btn btn-default btn-sm" title="Edit Profile">
                    <span aria-hidden="true" class="icon-edit"></span> Edit Profile
                </button>
            </li>
        <!--endif user can edit-->
    </ul>
    <ul id="stckProfileUpdateForm" class="profile-update-form hide">
        <li>
            <div class="form-group">
                <label>Email Address <span class="mouseprint">(Required. Not&nbsp;Published)</span></label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" value="••••••••" disabled/>
            </div>
            <div class="form-group">
                <a class="btn btn-default btn-sm" href="/users/lost-pass/" title="Reset your password.">Password Reset</a>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label>Description <span class="mouseprint">(Max&nbsp;140&nbsp;Characters)</span></label>
                <textarea class="form-control" rows="7" placeholder="Brevity is the soul of wit ;)"></textarea>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label>Profile Image</label>
                <!-- trying to get this working: http://stackoverflow.com/questions/11235206/twitter-bootstrap-form-file-element-upload-button/25053973#25053973 still doesn't show filename-->
                <div style="position:relative;">
                    <a class='btn btn-default btn-xs' href='javascript:;'>
                        Choose File...
                        <input id="stckUploadFileInput" class="form-control upload-file-input" type="file" name="file_source" size="40"  onchange='$("#stckUploadFileInfo").html($("#stckUploadFileInput").val());'>
                    </a>
                    &nbsp;
                    <span class='label label-info' id="stckUploadFileInfo"></span>
                </div>
            </div>
            <p class="mouseprint">
                JPG/PNG only. Recommend 400x400px minimum dimensions. 1mb file size limit.
            </p>
        </li>
        <li>
            <div class="form-group">
                <label><span aria-hidden="true" class="icon-link"></span> Personal Website</label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label><span aria-hidden="true" class="icon-behance"></span> Behance</label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label><span aria-hidden="true" class="icon-dribbble"></span> Dribbble</label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label><span aria-hidden="true" class="icon-facebook"></span> Facebook</label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label><span aria-hidden="true" class="icon-instagramm"></span> Instagram</label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label><span aria-hidden="true" class="icon-pinterest"></span> Pinterest</label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <div class="form-group">
                <label><span aria-hidden="true" class="icon-twitter"></span> Twitter</label>
                <input type="text" class="form-control"/>
            </div>
        </li>
        <li>
            <button id="stckProfileCancel" class="btn btn-default" type="cancel">Cancel</button>
            <button id="stckProfileSubmit" class="btn btn-primary pull-right" type="submit">Update Profile</button>
        </li>
    </ul>
    <ul id="stckProfileData">
        <li>
            <h5 class="sidebar-heading">Description</h5>
            <ul>
                <li>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
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
                    <a href="<?php echo $stckauth->user_url; ?>" title="Go to <?php echo $stckauth->nickname; ?>'s web page.'">
                        <span aria-hidden="true" class="icon-link"></span> <?php echo $stckauth->user_url; ?>
                    </a>

                </li>
                <li>
                    <a href="" title="">
                        <span aria-hidden="true" class="icon-facebook"></span> Facebook
                    </a>
                </li>
                <li>
                    <a href="" title="">
                        <span aria-hidden="true" class="icon-instagramm"></span> Instagram
                    </a>
                </li>
                <li>
                    <a href="" title="">
                        <span aria-hidden="true" class="icon-dribbble"></span> Dribbble
                    </a>
                </li>
                <li>
                    <a href="" title="">
                        <span aria-hidden="true" class="icon-pinterest"></span> Pinterest
                    </a>
                </li>
                <li>
                    <a href="" title="">
                        <span aria-hidden="true" class="icon-twitter"></span> Twitter
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</div>
