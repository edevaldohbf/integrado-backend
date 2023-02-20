export async function emailRecoveryPassword(token) {
    return `
        <p>Utilize essa nova senha para logar no sistema.</p>
        <p></p>
        <p>Nova senha: ${token}</p>
        `;
}