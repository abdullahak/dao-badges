// This function will append an icon under the profile photo
function appendIcon(profileImageContainer) {
    // Create an icon element
    var icon = document.createElement('img');
    icon.src = 'https://content.solsea.io/files/thumbnail/1682271198368-283738381.png'; // Replace with the URL of your actual icon
    icon.style.cssText = 'width:20px;height:20px;'; // Set the size of your icon as needed

    // Append the icon under the profile image container
    profileImageContainer.appendChild(icon);
}

// This function looks for profile photo containers and calls appendIcon on each
function addIconsToProfilePhotos() {
    // Twitter uses 'css-1dbjc4n r-1adg3ll r-18u37iz' as the class for profile image containers
    // This selector might change, so it needs to be updated accordingly
    var profileImageContainers = document.querySelectorAll('div.css-1dbjc4n.r-1adg3ll.r-18u37iz');

    profileImageContainers.forEach(appendIcon);
}

// Since Twitter loads content dynamically, we use a MutationObserver to watch for changes
// and apply our changes when new tweets are loaded
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            addIconsToProfilePhotos();
        }
    });
});

// Twitter's main content area class name is 'css-1dbjc4n r-14lw9ot r-13l2t4g r-1xcajam r-zchlnj'
// This might change, so it needs to be checked and updated if necessary
var targetNode = document.querySelector('div.css-1dbjc4n.r-14lw9ot.r-13l2t4g.r-1xcajam.r-zchlnj');

// Start observing
if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
}

// Initial run in case the content is already there before the observer starts
addIconsToProfilePhotos();
