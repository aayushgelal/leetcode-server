const express=require('express');
const jwt=require('jsonwebtoken');
const {auth}=require('./middleware.js');
const cors=require('cors');
const pool=require('./db.js');
const { default: OpenAI } = require('openai-api');
const { OpenAIApi, Configuration } = require('openai');
const dotenv='.env';
const app = express();
const JWT_SECRET = "so what's your secret";
let USER_ID_COUNTER = 1;

const openaiapi_key=process.env.openai_key;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({origin:"*"}));


const problems = [
    {
        problemId: "1",
        title: "Bitwise AND of Numbers Range",
        difficulty: "Medium",
        acceptance: "42%",
        description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        exampleIn: "left = 5, right = 7",
        exampleOut: "4"
    },
    {
        problemId: "2",
        title: " Add two numbers",
        difficulty: "Medium",
        acceptance: "41%",
        description: "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
        exampleIn: "a = 100 , b = 200",
        exampleOut: "300"
    },
    {
        problemId: "3",
        title: " Happy Number",
        difficulty: "Easy",
        acceptance: "54.9%",
        description: "Write an algorithm to determine if a number n is happy.",
        exampleIn: "n = 19",
        exampleOut: "true"
    },
    {
        problemId: "4",
        title: " Remove Linked List Elements",
        difficulty: "Hard",
        acceptance: "42%",
        description: "Given number k , removed kth element",
        exampleIn: "list: 1->2->3 , k=2",
        exampleOut: "1->3"
    },
    {
        problemId: "5",
        title: "Add Two Numbers",
        difficulty: "Medium",
        acceptance: "35%",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contains a single digit. Add the two numbers and return it as a linked list.",
        exampleIn: "l1 = [2,4,3], l2 = [5,6,4]",
        exampleOut: "[7,0,8]"
      },
      {
        problemId: "6",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        acceptance: "29%",
        description: "Given a string, find the length of the longest substring without repeating characters.",
        exampleIn: "s = 'abcabcbb'",
        exampleOut: "3"
      },
      {
        problemId: "7",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        acceptance: "30%",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        exampleIn: "nums1 = [1,3], nums2 = [2]",
        exampleOut: "2.0"
      },
    {
        problemId: "8",
        title: "201. Bitwise AND of Numbers Range",
        difficulty: "Medium",
        acceptance: "42%",
        description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        exampleIn: "left = 5, right = 7",
        exampleOut: "4"
    },
    {
        problemId: "9",
        title: "205. Add two numbers",
        difficulty: "Medium",
        acceptance: "41%",
        description: "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
        exampleIn: "a = 100 , b = 200",
        exampleOut: "300"
    },
    {
        problemId: "10",
        title: "202. Happy Number",
        difficulty: "Easy",
        acceptance: "54.9%",
        description: "Write an algorithm to determine if a number n is happy.",
        exampleIn: "n = 19",
        exampleOut: "true"
    },
   
    {
        problemId: "11",
        title: "Container With Most Water",
        difficulty: "Medium",
        acceptance: "48%",
        description: "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.",
        exampleIn: "height = [1,8,6,2,5,4,8,3,7]",
        exampleOut: "49"
      },
      {
        problemId: "12",
        title: "Integer to Roman",
        difficulty: "Medium",
        acceptance: "55%",
        description: "Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.",
        exampleIn: "num = 58",
        exampleOut: "'LVIII'"
      },
      {
        problemId: "13",
        title: "Roman to Integer",
        difficulty: "Easy",
        acceptance: "58%",
        description: "Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.",
        exampleIn: "s = 'III'",
        exampleOut: "3"
      },
      {
        problemId: "14",
        title: "Longest Common Prefix",
        difficulty: "Easy",
        acceptance: "37%",
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string ''.",
        exampleIn: "strs = ['flower','flow','flight']",
        exampleOut: "'fl'"
      },
      {
        problemId: "15",
        title: "3Sum",
        difficulty: "Medium",
        acceptance: "27%",
        description: "Given an array nums of n integers, find all unique triplets in the array which gives the sum of zero.",
        exampleIn: "nums = [-1,0,1,2,-1,-4]",
        exampleOut: "[[-1,-1,2],[-1,0,1]]"
      }
];
const USERS=[{email:"aayushgelal",password:"aayushgelal"}];
const SUBMISSIONS=[];
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.get('/problems',(req,res)=>{
  pool.query('SELECT * FROM users',(err,result)=> {
    if(err){
      console.log(err)
      

    }else{
      const data=result.rows;
      console.log(data);

    }

  });
    const filteredproblems=problems.map(x => {
       return {problemtitle:x.title,problemId:x.problemId,difficulty:x.difficulty,acceptance:x.acceptance
       }
    }
    )
    res.json({problems:filteredproblems});
})
app.get('/problems/:idd',(req,res) => {
    const a=req.params.idd;
    console.log(req.params.idd);

    const specificproblem=problems.find(x =>  x.problemId==a );
    res.json({problems:specificproblem})
})
app.get('/me',auth,(req,res) => {
    const User=USERS.find(user => user===req.userId);
    res.json({email:User.email});
})

app.post('/signup', function(req, res) {


    // Add logic to decode body
    // body should have email and password
  
  
    //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  
    const credentials= req.body;


    const user=credentials.email;
    const password=credentials.password;
    if(user){
    pool.query('SELECT email FROM users WHERE email=$1',[user],(err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
      } else {
        const existinguser = result.rows[0];
        if(existinguser){
          res.status(401).json({message:'User Exists'});

        }
        
        else{
          pool.query('INSERT INTO users(email,password) VALUES($1,$2)',[user,password])
          const token=jwt.sign({id:user},JWT_SECRET)
          
          res.status(200).json({ message: 'Signup successful', token:token});
        
       
        }
        
      }
    });
  }
  else{
    res.status(401).json({message:'Provide Valid Email'});
  }
 

  
    
    // return back 200 status code to the client
  })
  
  
  app.post('/login', (req, res) => {
    const credentials= req.body;
    
    const email=credentials.email;
    const password=credentials.password;

      pool.query('SELECT * FROM users WHERE email=$1 AND password=$2 ',[email,password],(err,result)=>{

        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Internal Server Error');
        } else {
          const matchedUser = result.rows[0];
    
          if (matchedUser) {
            const token=jwt.sign({
              id:matchedUser.id 
          },JWT_SECRET)
          return res.status(200).json({token:token});
          } else {
            // Username and password do not match
            res.status(401).json({message:'Username or password is incorrect'});
          }
        }
      })
      
     

      });


app.post('/submission',auth, async (req,res) => {
    const problemId=req.body.problemId;

    const submission=req.body.submission;
    const problem=problems.find(p=> problemId==p.problemId);
    const api=new Configuration({
      apiKey:process.env.openaikey
    })
    const openai=new OpenAIApi(api);
    const response=await openai.createChatCompletion({
      model:"gpt-3.5-turbo",
      messages:[
        {
          role:'user',
          content:`for the question ${problem.title} ${problem.description} is the answer ${submission}, correct the code and give me the code`
        }
      ]
    })

  //  const response = await fetch('https://chatgpt-api.shn.hk/v1/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-3.5-turbo",
  //       messages: [{ role: 'system', content: 'You are a user',}, { role: 'user', content: `for the question ${problem} is the answer ${submission}`}],
  //       max_tokens: 50
  //     })
  //   });
    console.log(response.data.choices[0].message.content)
    res.json({output:response.data.choices[0].message.content});


  

})
app.get("/submissons/:problemID",auth,(req,res) => {
    const problemId=req.params.problemID;
    const submissions=SUBMISSIONS.filter(x=> x.problemId==problemId && x.userId==req.userId)
    res.json({submissions})
})
  const port = 3000; // Choose any available port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});






