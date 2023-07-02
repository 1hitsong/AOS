# Set the paths and repository URLs
$mainRepoUrl = "https://github.com/1hitsong/AOS.git"
# Your local repository path
$forkedRepoPath = "E:\Repos\AOS" 

# Change directory to the forked repository
Set-Location -Path $forkedRepoPath

# Add the main repository as an upstream remote
git remote add upstream $mainRepoUrl

# Fetch the latest changes from the main repository
git fetch upstream

# Merge the fetched changes into your local branch
git merge upstream/master

# Push the updated branch to your forked repository on GitHub
git push origin master

# Clean up by removing the upstream remote
git remote remove upstream

# Output a success message
Write-Host "Forked repository updated successfully!"
