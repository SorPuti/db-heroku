const permissions = [
    'home_view:routes.home',
    'login_view:routes.login',
    'edit_account:user.editaccount',
    'publish_annouce:app.home.announce',
    'punish_member:app.member.punish',
    'delete_member:app.member.delete'
]


function getPermissions(index) {
    if (index && Number.isInteger(index))
        return permissions[index]
}

function isPermissions(permission) {
    for (const perm of permissions)
        if (perm === permission)
            return perm
    return undefined
}

module.exports = {
    getPermissions,
    isPermissions
}