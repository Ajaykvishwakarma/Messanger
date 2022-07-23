const express = require("express");
const authenticate = require("../middleware/authenticate");

const user = require('../models/user.model');
const router = express.Router();
const Chat = require('../models/chat.model');

router.get('/', authenticate, async (req, res) => {
    try{
        let chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate('latestMessage')
        .sort( { updateAt: -1})
        .then(async(results) => {
            results = await user.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email",
            });
            res.status(200).send(results);
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

router.post('/', authenticate, async (req, res) => {
    try{
        const { userId } = req.body;
        let chat = await Chat.find({
            isGroupChat: false,
            $and: [
                {
                    users: { $elemMatch: {$eq: req.user._id}},
                },
                {
                    users: { $elemMatch: { $eq: userId}}, 
                }
            ]
        })
        .populate("users", "-password")
        .populate("latestMessage");
        chat = await user.populate(chat[0], {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        if(chat != undefined) {
            return res.status(200).send(chat)
        } else{
            let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            }

            try{
                const createChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-passwaord");
                return res.status(200).send(FullChat);
            } catch (error) {
                return res.status(400).send(error.message);
         }
        }
    }  catch (error) {
        return res.status(400).send(error.message);
    }
})

router.post('/group', authenticate, async (req, res) => {
    try{
        let users = req.body.users;
        users.push(req.user);
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });
        const CreatedGroupDetails = await Chat.findOne({ _id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        return res.status(200).send(CreatedGroupDetails)
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.put('/rename', async (rq, res) => {
    try{
        const { chatId, chatName } = req.body;

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                chatName: chatName,
            },
            {
                new: true,
            }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if(!updatedChat) {
            return res.status(404).send("Chat Not Found!");
        } else {
            res.json(updatedChat);
        }
    } catch (error) {
        return res.status(400).send(error.message);
      }
});

router.put('/removemember', async (req, res) => {
    try{
        const { chatId, userId } = req.body;
        const removed = await Chat.findByIdAndUpdate (
            chatId,
            {
                $pull: { users: userId},
            },
            {
                new: true,
            }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (!removed) {
            return res.status(404).send("Chat Not Found!")
        } else {
            res.json(removed);
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.put("/addmember", async (req, res) => {
    try{
        const { chatId, userId } = req.body;

        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId},
            },
            {
                new: true,
            }
        )
        .populate("users", "-passwaord")
        .populate("groupAdmin", "-password");

        if(!added) {
            return res.status(404).send("Chat Not Found!");
        } else {
            res.json(added);

        }

    } catch (error) {
    return res.status(400).send(error.message);
  }
});


module.exports = router;