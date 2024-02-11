<script>

  import { Button , GradientButton } from 'flowbite-svelte';
  import { ThumbsUpSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
  
  let comments = [{   
                      commentId : 1,
                      userId : 1,
                      userImageURL : 'https://randomuser.me/api/portraits/men/43.jpg',
                      userName : 'User 1',
                      creationTime : new Date(12-2-2000),
                      message : "Comment from User 1 side"
                  } 
                  ,
                  {
                      commentId : 2,
                      userId : 2,
                      userImageURL : 'https://randomuser.me/api/portraits/women/43.jpg',
                      userName : 'User 2',
                      creationTime : new Date(12-2-2000),
                      message : "Comment from User 2 side"
                  }
                  
  ];
  
  let placeholderValue = "Write your comment here";
  
  let userId = 2;
  let userInput = ""; // Store user input
  let defaultPlaceholder = "Write your comment here"; // Store placeholder text
  
    function handleSubmit(event) {
      event.preventDefault(); // Prevent default form submission
      const commentMessage = event.target.textInput.value;
      console.log(commentMessage);
      let tempObj =  {
                      commentId : 2,
                      userId : 2,
                      userImageURL : 'https://randomuser.me/api/portraits/women/43.jpg',
                      userName : 'User 2',
                      creationTime : new Date(),
                      message : commentMessage
                   };
      comments = [...comments , tempObj];
  
      userInput = "";

      event.target.textInput.value = '';
      // const inputElement = event.target.elements.textInput;
      //console.log(inputElement);
      // inputElement.placeholder = defaultPlaceholder;
  
      // Process the submitted comment (e.g., log, submit to server, etc.)
     // console.log("Submitted comment:", userInput);
  
      // Clear the input and restore the placeholder
      
    }
  
    function handleInputChange(event) {
      // Update the user input as they type
      userInput = event.target.value;
    }
  
    function deleteComment(comment){

      comments = comments.filter(c => !(c.message === comment.message && c.userId === comment.userId))
    }
  
  
  </script>
  
  
  
  
  <section class="w-full rounded-lg border-2 border-purple-600 p-4 my-8 mx-auto max-w-xl">
      <h3 class="font-os text-lg font-bold">Comments of Task</h3>
  
      <!-- Sample Comment 1 -->
      {#each comments as comment}
      <div class="flex mt-4 relative">
          <div class="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
              <img class="h-12 w-12 rounded-full object-cover" src={comment.userImageURL}
                          alt="">
          </div>
  
          <div class="ml-3">
              <div class="font-medium text-purple-800">{comment.userName}</div>
              <div class="text-gray-600">Posted on {comment.creationTime}</div>
              <div class="mt-2 text-purple-800">{comment.message}</div>
          </div>
  
          <div class="absolute bottom-0 right-0 flex flex-row">
              <!-- Buttons -->
              {#if userId === comment.userId}
              <!-- <GradientButton outline pill color="redToYellow" class='mr-2'>Edit</GradientButton> -->
              <GradientButton outline pill color="redToYellow" on:click={()=>deleteComment(comment)}>Delete</GradientButton>
              {/if}
              <!-- <Button pill={true} class="!p-2 mr-2"><PenToSquareRegular class="w-4 h-4" /></Button>
              <Button pill={true} class="!p-2"><DeleteLeftSolid class="w-4 h-4" /></Button> -->
              <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                Button 1
              </button>
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Button 2
              </button> -->
            </div>
          
      </div>
      {/each}
  
      <!-- Sample Comment 2 -->
      <!-- <div class="flex mt-4">
          <div class="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
              <img class="h-12 w-12 rounded-full object-cover" src="https://randomuser.me/api/portraits/women/43.jpg"
                          alt="">
          </div>
          <div class="ml-3">
              <div class="font-medium text-purple-800">Jane Smith</div>
              <div class="text-gray-600">Posted on 2023-10-02 15:15</div>
              <div class="mt-2 text-purple-800">Another sample comment. Sed quis velit auctor, bibendum dolor in,
                  accumsan tellus.
              </div>
          </div>
      </div> -->
  
      <!-- Comment Form -->
      <form class="mt-4" on:submit={handleSubmit}>
  
          <div class="mb-4">
              <label for="comment" class="block text-purple-800 font-medium">Comment</label>
              <input type="text" id="textInput" placeholder={defaultPlaceholder}/>
              <!-- <input type="text" id = 'textInput' placeholder={placeholderValue} /> -->
              <!-- <textarea id="comment" name="comment" class="border-2 border-purple-600 p-2 w-full rounded" placeholder={placeholderValue} required></textarea> -->
          </div>
  
          <button type="submit"
                      class="bg-purple-700 text-white font-medium py-2 px-4 rounded hover:bg-purple-600">Post
                      Comment
          </button>
      </form>
  </section>