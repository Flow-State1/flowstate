# flowstate


Clone the github repository onto your laptop:

    -Create a folder on your laptop and open it with VS CODE.
    -Open the VS CODE terminal run the command:  git clone https://github.com/refentse1/flowstate.git
    -Then go into the repository cd flowstate

  
Create new branch(make branch name to be descriptive):
  - Run command: git checkout frontend (if you are working on frontend)
  - Run command: git branch newbranchname
  - Run command: git checkout branchname (branchname is recently created branch)
    
    
Install yarn and dependencies for the project:
  - On the terminal run the command: npm install --global yarn 
  - After the installation run the command(Make sure the terminal thats being used on vs code is not powershell): yarn 
  
Run the application:
  - Run the command: yarn run dev
  

Saving changes to repository from newly created branch (follow these steps if you are working on a newly created branch and you havent followed them / to publish branch):
  - Run command: git status (To verify you are working on the appropriate branch before commiting)
  - Run command: git add . (To add any new files that you created)
  - Run command: git commit -m "commit message that should be descriptive"
  - Run command: git push --set-upstream origin branchname (where branchname is the branch you created)
  
  
Saving changes when branch is already published (make sure you are working on your branch or appropriate branch):
  - Run command: git status (To verify you are working on the appropriate branch before commiting)
  - Run command: git add . (To add any new files, if you created any. If not ignore)
  - Run command: git commit -m "commit message that should be descriptive"
  - Run command: git push (To send everything to the remote branch on the repository)

  
=======================================================

    


