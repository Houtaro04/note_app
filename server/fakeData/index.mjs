export default {
    author: [
        {
            id: 123,
            name: 'Viet Anh'
        },
        {
            id: 999,
            name: 'Vanh Coder'
        }
    ],
    folders: [
        {
            id: "1",
            name: 'Home',
            createAt: '2022-11-18T03:42:13Z',
            authorId: 123,
        },
        {
            id: "2",
            name: 'New Folder',
            createAt: '2022-10-18T03:42:13Z',
            authorId: 999,
        },
        {
            id: "3",
            name: 'Work',
            createAt: '2022-09-18T03:42:13Z',
            authorId: 123,
        },
    ],
    notes: [
        {
            id: "123",
            content: '<p>Go to supermarket</p>',
            folderId: "1"
        },
        {
            id: "231",
            content: '<p>Go to Mall</p>',
            folderId: "2"
        },
        {
            id: "321",
            content: '<p>Go to School</p>',
            folderId: "1"
        }
    ]
}
