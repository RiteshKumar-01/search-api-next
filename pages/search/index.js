import React, { useState } from 'react'

const Search = ({ result }) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const handleSend = async () => {
        try {
            console.log(input);
            const response = await fetch(`/api/search?q=${input}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log({ data });
            setResults(data);
            console.log({ results });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setInput('');
    };

    return (

        <div style={styles.container}>
            <div style={styles.chatBox}>
                <div style={styles.botMessage}>Hello! How can I assist you today?</div>
                <div style={styles.userMessage}>I need some information about your services.</div>
                <div style={styles.botMessage}>Sure, what would you like to know?</div>
            </div>
            <div style={styles.inputBox}>
                <input
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button style={styles.button} onClick={handleSend}>Send</button>
            </div>
        </div>

    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '50vw',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
    },
    chatBox: {
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#dcf8c6',
        padding: '10px',
        borderRadius: '10px',
        margin: '5px 0',
        maxWidth: '70%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e6e6e6',
        padding: '10px',
        borderRadius: '10px',
        margin: '5px 0',
        maxWidth: '70%',
    },
    inputBox: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px 0 0 5px',
        outline: 'none',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '0 5px 5px 0',
        cursor: 'pointer',
        outline: 'none',
    },
};

export const getServerSideProps = async (context) => {
    const query = context.query.q || 'default';
    const response = await fetch(`https://serpapi.com/search?q=${query}`, {
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`
        }
    });
    const data = await response.json();

    return {
        props: {
            result: data,
        },
    };
};
export default Search