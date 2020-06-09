const GitHub = require('github-api-improved');

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const ORG = process.env.GITHUB_ORG_NAME;
const MY_TEAM = process.env.GITHUB_MY_TEAM;
const MY_LOGIN_ID = process.env.GITHUB_MY_LOGIN_ID;

// TODO read from command args
const REPO_NAME = process.env.GITHUB_REPO_NAME;
const gh = new GitHub({
    token: GITHUB_ACCESS_TOKEN,
});

const org = gh.getOrganization(ORG);
const repo = gh.getRepo(ORG, REPO_NAME);

exports.request = () => {
    org.getTeams((err, result) => {
        const teamIds = result.filter(item => {
            return item.name === MY_TEAM;
        }).map((items) => {
            return items.id;
        });

        gh.getTeam(teamIds[0]).listMembers({}, (err, result) => {
            const memberLoginIds =
            result.map((member) => {
                return member.login;
            }).filter((login) => {
                return login !== MY_LOGIN_ID;
            });

            repo.listPullRequests({}, (err, result) => {

                if (err !== null) {
                    console.log(`최근에 생성한 PR이 없습니다.\n org: ${ORG}, repo_name: ${REPO_NAME}`);
                    process.exit();
                }

                const pullRequest =
                result.filter((pullRequest) => {
                    return pullRequest.user.login === MY_LOGIN_ID;
                }).map((pr) => {
                    return pr;
                });
                const latestPrNo = pullRequest[0].number;

                const obj = {
                    reviewers: memberLoginIds,
                }

                repo.createReviewers(latestPrNo, obj ,(err, result, request) => {
                    if (err === null) {
                        console.log('코드 리뷰 요청이 완료되었습니다.');
                        console.log(result._links.self.href);
                    }
                });
            });
        });
    });
}

