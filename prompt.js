export function Prompt(current_directory_str, parent_directory_str, username) {
    let pwd = ''
    if(current_directory_str == '~/') {
        pwd = current_directory_str
    }
    else {
        if(parent_directory_str == '~/') {
            pwd = parent_directory_str + current_directory_str
        }
        else {
            pwd = '~/' + parent_directory_str + current_directory_str
        }
    }

    return username + ' ' + pwd + ' > '
}
