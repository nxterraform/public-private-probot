/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");


  app.on("repository.created", async (context) => {
    const visibilty = context.payload.repository.private;
    while(!visibilty){
      const issueStatement = context.issue({
        title: "[Alert] Public repo created!!",
        body: " Please change your repository visibility, Your repo is visible to internet"
      });
      const createIssueParams = Object.assign({}, context.repo(), issueStatement || {})
      return context.octokit.issues.create(createIssueParams);
    }
    return;
  });
  app.on("repository.publicized", async (context) => {
    const pub = context.issue({
      title: "[Alert] Repo publicized!!",
      body: "You changed your repository is Public to internet!!"
    });
    return context.octokit.issues.create(pub);
  });

};
