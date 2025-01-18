const questions = [
    {
        "question": "Which of the following is a feature of LINQ in C#?",
        "options": [
            "It allows querying data in an object-oriented manner.",
            "It requires SQL to perform queries.",
            "It works only with databases.",
            "It cannot be used with arrays."
        ],
        "answer": "It allows querying data in an object-oriented manner."
    },
    {
        "question": "What is the primary use of async/await in C#?",
        "options": [
            "To speed up synchronous methods.",
            "To handle multiple threads manually.",
            "To simplify asynchronous programming.",
            "To enforce the use of exceptions."
        ],
        "answer": "To simplify asynchronous programming."
    },
    {
        "question": "Which of the following SQL commands is used to retrieve data from a database?",
        "options": [
            "INSERT",
            "UPDATE",
            "DELETE",
            "SELECT"
        ],
        "answer": "SELECT"
    },
    {
        "question": "In Entity Framework Core, what is the purpose of a migration?",
        "options": [
            "To synchronize the database schema with the application model.",
            "To perform data updates in the database.",
            "To optimize database performance.",
            "To create an initial database table."
        ],
        "answer": "To synchronize the database schema with the application model."
    },
    {
        "question": "Which of the following methods in C# allows defining anonymous types?",
        "options": [
            "var",
            "new",
            "dynamic",
            "object"
        ],
        "answer": "var"
    },
    {
        "question": "What is the default access modifier for class members in C#?",
        "options": [
            "public",
            "private",
            "protected",
            "internal"
        ],
        "answer": "private"
    },
    {
        "question": "Which of the following is true about SQLite?",
        "options": [
            "It is a client-server database.",
            "It is a relational database management system that stores data in a file.",
            "It supports multi-user access by default.",
            "It requires a dedicated server for deployment."
        ],
        "answer": "It is a relational database management system that stores data in a file."
    },
    {
        "question": "Which of the following is NOT a valid C# collection type?",
        "options": [
            "List<T>",
            "Dictionary<K, V>",
            "Queue<T>",
            "ArrayList<T>"
        ],
        "answer": "ArrayList<T>"
    },
    {
        "question": "What does the yield keyword do in C#?",
        "options": [
            "It terminates a loop.",
            "It returns a value from a method and saves its state.",
            "It defines a new method.",
            "It declares a delegate."
        ],
        "answer": "It returns a value from a method and saves its state."
    },
    {
        "question": "Which of the following features does an ASP.NET MVC application use for handling HTTP requests?",
        "options": [
            "HTTP handlers",
            "HTTP modules",
            "Controllers and actions",
            "WebForms"
        ],
        "answer": "Controllers and actions"
    }
];


export default function getQuestions() {
    return questions;
}