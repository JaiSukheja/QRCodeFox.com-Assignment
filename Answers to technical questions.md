### How long did you spend on the coding test? 
I spent about 4 hours on the coding test.

### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
The most useful feature that was added to the latest version of JavaScript is the optional chaining operator. It allows you to access deeply nested properties without having to check if each level exists. Here's an example of how I've used it in the task management application:

    TasksArray
          .filter((single) => single.task.toLowerCase().includes(search.toLowerCase()) && search !== "")
          .map((single, idx) => (
            <Task
              task={single.task}
              desc={single.desc}
              dueDate={single.dueDate}
              priority={single.priority}
              done={single.done}
              key={idx}
              idx={idx}
              deleteClick={deleteClick}
              editClick={editClick}
              doneClick={doneClick}
            />
          ))


### How would you track down a performance issue in production? Have you ever had to do this?

I would track down a performance issue in production by using the browser's developer tools to profile the application. I would look for any bottlenecks in the code, such as slow database queries or inefficient algorithms. I would also check the network tab to see if there are any slow requests. I have had to do this in the past, and I was able to identify and fix the performance issue by optimizing the database queries.


### If you had more time, what additional features or improvements would you consider adding to the task management application?

If I had more time, I would consider adding the following features to the task management application:

- User authentication: Allow users to sign up and log in to the application so that they can save their tasks and access them from any device.
- Task categories: Allow users to categorize their tasks into different categories, such as work, personal, and shopping.
- Task reminders: Allow users to set reminders for their tasks so that they receive notifications when a task is due.
- Task sharing: Allow users to share tasks with other users, such as family members or colleagues.
- Task sorting: Allow users to sort their tasks by due date, priority, or category.
