import fakeData from '../fakeData/index.mjs'
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';
import { GraphQLScalarType } from 'graphql';
export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value){
      return new Date(value); // value from the client
    },
    serialize(value){
      return value.toISOString(); // value sent to the client
    }
  }),
  Query: {
    folders: async (parent, args, context) => {
        const folders = await FolderModel.find({
          authorId: context.uid,
        }).sort({
          updatedAt: 'desc',
        });
        console.log({folders, context});
        return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      console.log({folderId})
      const foundFolder = await FolderModel.findById(folderId)
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId)
      return note;
      // return fakeData.notes.find(note => note.id === noteId)
    }
  },
  Folder: {
    author: async (parent, args) => {
      console.log({parent, args})
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId
      });
      return author;

      // return fakeData.author.find((author) => author.id === authorId);
    },
    notes: async (parent, args) => {
      console.log({parent})
      const notes = await NoteModel.find({
        folderId: parent.id
      }).sort({
        updatedAt: 'desc',
      });
      console.log({notes});
      return notes;
      // return fakeData.notes.filter(note=>note.folderId === parent.id);
    }
  },
  Mutation: {
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const updatedNote = await NoteModel.findByIdAndUpdate(noteId, args);
      return updatedNote;
    },
    addFolder: async (parent, args, context) => {
        console.log('context', context);
        const newFolder = new FolderModel({...args, authorId: context.uid});
        console.log((newFolder))
        await newFolder.save();
        return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });

      if(!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    }
  }
};