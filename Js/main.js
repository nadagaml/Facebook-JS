//Api 
// index.js or app.js
// import './styles.css';



// === Infinity Sctoll ======
const baseUrl = "https://tarmeezacademy.com/api/v1"
let currentPage = 1
let lastPage = 1
window.addEventListener("scroll", function () {
    const endOfPage = window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight;

    if (endOfPage && currentPage < lastPage) {
        currentPage = currentPage + 1
        getPosts(false, currentPage)

    }
})
setupIn()

// go to home page
function homePage()

{
    window.location="Home.html"
}



getPosts()

// ====== Start Function to get all posts in home page  ==========
function getPosts(reload = true, page = 1) {
    toggleLoader(true)
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=2&page=${page}`)
        .then((response) => {
            toggleLoader(false)
            Posts = response.data.data
            console.log("this response is: ", Posts)
            lastPage = response.data.meta.last_page
            if (reload) {
                document.getElementById("posts").innerHTML = ""
            }

            for (post of Posts) {
                console.log("this response is: ", post)
                const author = post.author

                //show or hide (edit) button
                let user = getCurrentUser()
                let isMyPost = user != null && post.author.id == user.id
                let editBnuttonContent = ``

                // if(isMyPost)
                // {
                //     editBnuttonContent = `
                //     <button class= "btn btn-danger" style="float:right" onclick="deleteBtn('${encodeURIComponent(JSON.stringify(post))}')"> Delete </button>
                //     <button class= "btn btn-secondary" style="float:right" onclick="editBtn('${encodeURIComponent(JSON.stringify(post))}')"> Edit </button>
                //     `
                // }


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

            <span  onclick="UserClicked(${author.id})" style=" cursor: pointer;">
                <img src="${author.profile_image}" alt="nada png" style="width: 40px ; height:40px;" class="rounded-circle border border-2 ">
                <b>${author.username}</b>
                </span>

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
                document.getElementById("posts").innerHTML += content

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
function UserClicked(userId)
{
    window.location = `Profile.html?userid=${userId}`
}

function profileClicked()
{
    const user = getCurrentUser()
    const userid = user.id
    window.location = `Profile.html?userid=${userid}`
}
//========= Start Function to Login  =============
function LoginBtn() {
    const userName = document.getElementById("UserName-input").value
    const Password = document.getElementById("password-input").value

    const params = {
        "username": userName,
        "password": Password
    }

    const url = `${baseUrl}/login`
    toggleLoader(true)
    axios.post(url, params)
        .then((response) => {
            
            console.log(response.data)
            localStorage.setItem("Token", response.data.token)
            localStorage.setItem("User", JSON.stringify(response.data.user))

            //close the model after login
            const model = document.getElementById("loginModal")
            const modelInstance = bootstrap.Modal.getInstance(model)
            modelInstance.hide()
            showAlert("Logged in successfully", "success")
            setupIn()

        }).catch((error)=>
    {
        const message = error.response.data.message
        showAlert(message, "danger")
    }).finally(()=>
{
    toggleLoader(false)
})


}
//======= End login function ============ 

// =========== Start function logout =============
function logout() {
    localStorage.removeItem("Token")
    localStorage.removeItem("User")
    showAlert("Logged out successfully", "success")
    setupIn()
}
// ===========  End function logout =============

//=============  Register ==========

function RegisterBtn() {
    const Name = document.getElementById("Register-Name-input").value
    const userName = document.getElementById("Register-UserName-input").value
    const Password = document.getElementById("Register-password-input").value
    const image = document.getElementById("Register-img-input").files[0]


    let formData = new FormData()
    formData.append("name", Name)
    formData.append("username", userName)
    formData.append("password", Password)
    formData.append("image", image)

    const headers = {
        "Content-Type": "multipart/form-data"
    }

    url = `${baseUrl}/register`
    toggleLoader(true)
    axios.post(url, formData, {
        headers: headers
    })
        .then((response) => {
            localStorage.setItem("Token", response.data.token)
            localStorage.setItem("User", JSON.stringify(response.data.user))

            //close the model after login
            const model = document.getElementById("RegisterModal")
            const modelInstance = bootstrap.Modal.getInstance(model)
            modelInstance.hide()
            showAlert("New User Register Successfully", "success")
            setupIn()
        }).catch((error) => {
            const message = error.response.data.message
            showAlert(message, "danger")
        }) 
        .finally(()=>{
            toggleLoader(false)
        })

}


// function to create new post 
function CreateNewPostClicked() {


    let postId = document.getElementById("post-id-input").value
    let isCreate = postId == null || postId == ""

    const Title = document.getElementById("Post-Title-input").value
    const Body = document.getElementById("Post-body-input").value
    const image = document.getElementById("Post-img-input").files[0]

    let formData = new FormData()
    formData.append("body", Body)
    formData.append("title", Title)
    formData.append("image", image)



    const token = localStorage.getItem("Token")
    const headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
    }

    if (isCreate) {
        url = `${baseUrl}/posts`
    }
    else {
        url = `${baseUrl}/posts/${postId}`

        formData.append("_method", "put")
    }
    toggleLoader(true)
    axios.post(url, formData, {
        headers: headers
    })

        .then((response) => {
            console.log(response.data)

            //close the model after login
            const model = document.getElementById("Create-Post-Modal")
            const modelInstance = bootstrap.Modal.getInstance(model)
            modelInstance.hide()
            showAlert("New Post Created Successfully", "success")
            getPosts()

        }).catch((error) => {
            const message = error.response.data.message
            showAlert(message, "danger")
        })
        .finally(()=>{
            toggleLoader(false)
        })


}


// show alert
function showAlert(customMessage, type = "success") {
    const alertPlaceholder = document.getElementById('success-alert')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    appendAlert(customMessage, type)

    setTimeout(() => {
        const alertElement = document.getElementById('success-alert')
        const alert = new bootstrap.Alert(alertElement)
        alert.hide()
    }, 2000);


}

//End function showSuccessAlert

//function SetUI to ensure the user is login or logout
function setupIn() {
    const token = localStorage.getItem("Token")

    const loginDiv = document.getElementById("logged-in-div")
    const logoutDiv = document.getElementById("logout-div")
    const AddBtn = document.getElementById("add-btn")

    if (token == null) //user id guest (not logged in)

    {

        loginDiv.style.setProperty("display", "flex", "important")
        logoutDiv.style.setProperty("display", "none", "important")

        if (AddBtn != null) {
            AddBtn.style.setProperty("display", "none", "important")
        }

    }
    else {
        //user is login 

        loginDiv.style.setProperty("display", "none", "important")
        logoutDiv.style.setProperty("display", "flex", "important")

        if (AddBtn != null) {
            AddBtn.style.setProperty("display", "block", "important")
        }

        const user = getCurrentUser()
        document.getElementById("Nav-userName").innerHTML = user.username
        document.getElementById("Nav-userImage").src = user.profile_image

        
       

        

    }

}

//get current user
function getCurrentUser() {
    let user = null
    const storageUser = localStorage.getItem("User")
    if (storageUser != null) {
        user = JSON.parse(storageUser)
    }
    return user
}

// =================== get post detailes =================


// get id from url link

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("postId")
console.log(id)


function postClicked(postId) {
    window.location = `postDetailes.html?postId=${postId}`
}


getPostById()
function getPostById() {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then((response) => {
            const Post = response.data.data
            const comments = Post.comments
            const author = Post.author

            document.getElementById("userName-span").innerHTML = author.username
            // check if title is null or not
            let postTitle = ""

            if (Post.title != null) {
                postTitle = Post.title
            }

            let commentContent = ``
            for (comment of comments) {
                commentContent +=
                    `
                <!-- comments -->
                <div class="p-3" style="background-color: rgb(221, 221, 221);">
                    <!-- profile pic + userName -->
                    <img src="${comment.author.profile_image}" class="rounded-circle" style="width: 40px;height: 40px;">
                    <b>${comment.author.username}</b>
                    <!-- End profile pic + userName -->
 
                    <!-- comment Body -->
                    <div>
                        ${comment.body}
                    </div>
                </div>




                <!-- End coments -->
                `
            }
            const psotContent = `
       <!-- Post cards -->
       <div class="card shadow">
           <div class="card-header">
               <img src="${author.profile_image}" alt="image" style="width: 40px ; height:40px;"
                   class="rounded-circle border border-2 ">
               <b>${author.name}</b>
           </div>
           <div class="card-body">
               <img class="w-100" src="${Post.image}">

               <h6 style="color: rgb(199, 196, 196);" class="mt-1">${Post.created_at}</h6>
               <h5>${Post.title}</h5>
               <p>${Post.body}.</p>
               <hr>

               <div>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       class="bi bi-chat-left-text" viewBox="0 0 16 16">
                       <path
                           d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                       <path
                           d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                   </svg>

                   <span class="pt-2">
                        ${Post.comments_count}
                   </span>


               </div>

               
               <div id="comment" class="pt-3 rounded-3">
               ${commentContent}
               </div>

               <div class="post-footer pt-3">
               <div class="input-group mb-3" id="add-Comment-div"> 
               <span class="input-group-text" id="basic-addon1">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
               <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
             </svg>
               </span>
                   <input class="form-control" placeholder="Add a comment.." type="text" id="comment-input">
                   <button class="btn btn-outline-primary" type="button"  onclick="CreateComment()">send</button>
               </div>




           </div>
       </div>
       `
            document.getElementById("post").innerHTML = psotContent

            console.log(Post)


        })
}


// ================ create comment =================
CreateComment()

function CreateComment() {
    let commentBody = document.getElementById("comment-input").value

    const params = {
        body: commentBody
    }

    let token = localStorage.getItem("Token")

    const url = `${baseUrl}/posts/${id}/comments`

    axios.post(url, params, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response.data)
        showAlert("the comment has been created successfully", "success")
        getPostById()
    })

        .catch((error) => {
            const errorMessage = error.response.data.message
            showAlert(errorMessage, "danger")
        })

}

// ============== edit post ===========

function editBtn(postObj) {
    let post = JSON.parse(decodeURIComponent(postObj))
    console.log(post)

    document.getElementById("post-model-submit-btn").innerHTML = "Update"
    document.getElementById("post-id-input").value = post.id
    document.getElementById("postModelTitle").innerHTML = "Edit Post"
    document.getElementById("Post-Title-input").innerHTML = post.title
    document.getElementById("Post-body-input").innerHTML = post.body

    let postModel = new bootstrap.Modal(document.getElementById("Create-Post-Modal"), {})
    postModel.toggle();
}

function addBtnClicked() {


    document.getElementById("post-model-submit-btn").innerHTML = "Create"
    document.getElementById("post-id-input").value = ""
    document.getElementById("postModelTitle").innerHTML = "Create Post"
    document.getElementById("Post-Title-input").innerHTML = ""
    document.getElementById("Post-body-input").innerHTML = ""

    let postModel = new bootstrap.Modal(document.getElementById("Create-Post-Modal"), {})
    postModel.toggle();
}

// ========== Delete post ==============

function deleteBtn(postObj) {
    let post = JSON.parse(decodeURIComponent(postObj))

    document.getElementById("delete-post-id-btn").value = post.id


    let postModel = new bootstrap.Modal(document.getElementById("Delete-Post-Modal"), {})
    postModel.toggle();
}

function DeletePostClicked() {
    let token = localStorage.getItem("Token")
    const headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
    }

    const postid = document.getElementById("delete-post-id-btn").value

    const url = `${baseUrl}/posts/${postid}`
    axios.delete(url, {
        headers: headers
    })
        .then((response) => {
            console.log(response.data)
            //close the model after delete
            const model = document.getElementById("Delete-Post-Modal")
            const modelInstance = bootstrap.Modal.getInstance(model)
            modelInstance.hide()
            showAlert("The post has been deleted", "success")
            getPosts()
            window.location.reload();
        })
        .catch((error) => {
            const message = error.response.data.message
            showAlert(message, "danger")
        })


}

// loader
function toggleLoader(show = true)
{
    if(show)
    {
        document.getElementById("loader").style.visibility = 'visible';
    }
    else
    {
        document.getElementById("loader").style.visibility = 'hidden'
    }
}

// jQuery to add animation and color change on hover
$(document).ready(function(){
    $("h1").hover(function(){
      $(this).css({
        "color": "#e74c3c", // Red color
        "animation": "shake 0.5s"
      });
    }, function(){
      $(this).css({
        "color": "", // Reverts back to default color
        "animation": ""
      });
    });
  });



