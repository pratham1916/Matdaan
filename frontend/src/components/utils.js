const isAdmin = true;
const isMenuAllowed  = (x) => {
    let permission;
    if (isAdmin) {
        permission = ["Add Candidates", "Verify Voter", "Candidate List", "Admin Result"].includes(x);
    } else if (!isAdmin) {
        permission = ["Contact", "Vote", "User Result", "About"].includes(x);
    }
    return permission;
}

export default isMenuAllowed;