
// ======== profile page scripts =========


function getCurrentUserId()
{
    const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("userid")
return id
}

function getUser() {
    const id = getCurrentUserId()
    axios.get(`${baseUrl}/users/${id}`)
        .then((response) => {
            console.log(response.data.data);
            const user = response.data.data
            document.getElementById("main-Info-name").innerHTML = user.name
            document.getElementById("main-Info-email").innerHTML = user.email
            document.getElementById("main-Info-userName").innerHTML = user.username
            document.getElementById("main-Info-image").src = user.profile_image
            document.getElementById("post-number").innerHTML = user.posts_count
            document.getElementById("post-comments").innerHTML = user.comments_count


        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
}
getUser()






getPostrPfile()

// ====== Start Function to get all posts  ==========
function getPostrPfile() {

    const id = getCurrentUserId()
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
        .then((response) => {
            Posts = response.data.data
            console.log("this response is profile: ", Posts)


 
             document.getElementById("profile-post").innerHTML = ""

            for (post of Posts) {

                const author = post.author

                //show or hide (edit) button
                let user = getCurrentUser()
                let isMyPost = user != null && post.author.id == user.id
                let editBnuttonContent = ``


                if (isMyPost) {
                    editBnuttonContent = `
                    <div style="float:right">
                        <button class="btn btn-danger" onclick="deleteBtn('${encodeURIComponent(JSON.stringify(post))}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M1.5 3.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13l-.354 7.071A1.5 1.5 0 0 1 11.146 13H4.854a1.5 1.5 0 0 1-1.146-2.429L3 5H1.5a.5.5 0 0 1-.5-.5zm1-1a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5V3H2v-.5zm10.854 9l.353-7.071A.5.5 0 0 1 13.146 4H2.854a.5.5 0 0 1 .354.929L3.146 11h8.708zM5.5 6a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5zm3-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5z"/>
                            </svg> Delete
                        </button>
                        <button class="btn btn-secondary" onclick="editBtn('${encodeURIComponent(JSON.stringify(post))}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.354 1.646a.5.5 0 0 1 0 .708L2.793 12.207l-.793 3.56a.5.5 0 0 0 .628.628l3.56-.793L14.354 3.646a.5.5 0 0 1 .708 0l1.207 1.207a.5.5 0 0 1 0 .708L12.354 1.646zM2 13v1h1l9.273-9.273-1-1L2 13z"/>
                            </svg> Edit
                        </button>
                    </div>
                    `;
                }



                // check if title is null or not
                let postTitle = ""

                if (post.title != null) {
                    postTitle = post.title
                }

                let content = `
               
                <div class="card shadow">
                <div class="card-header">
                    <img src="${author.profile_image}" alt="nada png" style="width: 40px ; height:40px;" class="rounded-circle border border-2 ">
                    <b>${author.username}</b>
                
                        ${editBnuttonContent}
                    </div>
                <div class="card-body" onclick = "postClicked(${post.id})" style="cursor: pointer;">
                    <img class="w-100" src="${post.image}">
                
                    <h6 style="color: rgb(199, 196, 196);" class="mt-1">${post.created_at}</h6>
                    <h5>${postTitle}</h5>
                    <p>${post.body}</p>
                    <hr>
                
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                        </svg>
                        <span>
                        ${post.comments_count}
                
                        <spna id="post-tages-${post.id}">
                
                        </spna>
                    
                        </span>
                
                
                        
                    </div>
                
                </div>
                </div>

        `
                document.getElementById("profile-post").innerHTML += content

                const currentPostTagsId = `post-tages-${post.id}`
                document.getElementById(currentPostTagsId).innerHTML = ""
                for (tag of post.tags) {
                    let tageContent =
                        `
                    <button type="button" class="btn btn-secondary btn-sm rounded-5">${tag.name}</button>

                    `
                    document.getElementById(currentPostTagsId).innerHTML += tageContent
                }
            }
        })
}
//========= End the function ===============

{/*Arrow */}

// // Scroll arrow up
let profileOffset = $("#profile-post").offset().top;

$(window).scroll(function ()
{
    let wScroll = $(window).scrollTop();

    if(wScroll > profileOffset - 50)
    {
        $("#Arrow-up-profile").fadeIn(500); 
    }
    else
    {
        $("#Arrow-up-profile").fadeOut(500);
    }
})

$("#Arrow-up-profile").click(function()
{
    //speed more
    // $(window).scrollTop(0)

    //speed with smooth and time 
    $("body,html").animate({scrollTop:0},500)
})


