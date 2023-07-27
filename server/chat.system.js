/*

    Design a real time chat system using socket.io

    Expected:

    This procject will test your knowdledge on socket.io and basic react js



    1. App should ask user name on opening app. 
        a. Open 1 browser tab =>  Enters UserA as name
        b. Open 2nd browser tab =>  Enters UserB as name
        c. Open 3rd browser tab =>  Enters UserC as name
        d. Open 4rth brower tab =>  Enters UserD as name

        System should remeber these names and messages being sent

    2. App should show all currently active users and which clicked there names any user should be able to send them message
        for example:
            a. If I am userA, i click to chat with userB. I should be able to text a message to userB, and 2nd browser tab i.e userB should see it.
            b. When i click on the 2nd Tab, now i am userB, i should be able to reply to userA i.e 1st browswer tab

        Goal here is to test your idea of creating a chat system.
        similarly, any user should be able to chat with any user that is currently active.

        ******************************************************************************************************
        note: if any user close their browswer tab, we should consider them INACTIVE,
        ******************************************************************************************************

        For already ative chat 
            i. Any user that is chatting with inactive user should show a message they are inactive
                a. if you are chatting and the other user is now inactive, you should still be able to send them message.
                    Message should be stored and when opened a new browser tab and the name is entered same, message should be retrieve along with previous their message.

        For intiating new chat:
            ii. it should also go away from currenttly active user list in the ui, and no user should be able to intiate a new message chat with thenm.


    
    3. Now i close all the tabs that were opened,
        i.  open a new browser i type my name  i again entered "USERA" previously entered
        ii. open another new tab, this time type "USERB" as previously entered

        The previous chat between these two users should be there.


        Think of it like a messenger/ or anyother messaging system, where friends chat with each other.
        By entering name, it's acting like userid or a profile.


 

Provided is a schema for user and message. Try to come up with a chat system.

Bonus:
4. See if you can make it a group chat all the user that has a tab opened and entered there names i,e userA, userB, userC, and userD will enter in the group chat 

*/