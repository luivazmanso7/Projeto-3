"use client";

export default function HomeButtons() {
    const buttonStyleEntrar = {
        backgroundColor: '#9BB61B',
        color: '#fff',
        border: '2px solid #281719',
        fontWeight: 'bold',
        borderRadius: '0.375rem',
        padding: '0.5rem 1.5rem',
        transition: 'all 0.2s',
        cursor: 'pointer',
        marginRight: '0.5rem',
    };
    const buttonStyleCadastro = {
        backgroundColor: '#fff',
        color: '#281719',
        border: '2px solid #9BB61B',
        fontWeight: 'bold',
        borderRadius: '0.375rem',
        padding: '0.5rem 1.5rem',
        transition: 'all 0.2s',
        cursor: 'pointer',
        marginRight: '0.5rem',
    };
    return (
        <div className="flex justify-center">
            <a
                href="/login"
                style={buttonStyleEntrar}
                onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#281719';
                    e.currentTarget.style.color = '#9BB61B';
                    e.currentTarget.style.border = '2px solid #281719';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = '#9BB61B';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.border = '2px solid #281719';
                }}
            >
                Entrar
            </a>
            <a
                href="/cadastro"
                style={buttonStyleCadastro}
                onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#9BB61B';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.border = '2px solid #281719';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#281719';
                    e.currentTarget.style.border = '2px solid #9BB61B';
                }}
            >
                Cadastro
            </a>
            <a
                href="/dashboard"
                style={buttonStyleCadastro}
                onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#9BB61B';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.border = '2px solid #281719';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#281719';
                    e.currentTarget.style.border = '2px solid #9BB61B';
                }}
            >
                Painel
            </a>
        </div>
    );
} 