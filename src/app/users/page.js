import UserForm from "./userForm"

// export async function getUsers() {
//     const url = `http://localhost:3000/api/users`
//     const response = await fetch(url)
//     return await response.json()
// }

export default async function UsersPage() {
    // const users = await getUsers()
    return <main>
    <UserForm />
        {/* <ul>
            {
                users.map(user => {
                    return <li key={user.id}>
                        <span>{user.name} -  {user.role}</span>
                    </li>
                })
            }
        </ul> */}
    </main>
}