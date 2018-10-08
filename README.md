# Dear Diary
## App's Location http://more-recipes27.herokuapp.com/

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Back-end: Node.js, Express.js </li>
  <li>Database: MongoDB</li>
</ul>

<h3>Usage</h3>
<ul>
    <li>Clone or download the repo</li>
    <li>npm install - to install the dependencies need by the app</li>
    <li>create a .env file, insert data as seen in .env.exaple file</li>
    <li>npm start - to run the app</li>
</ul>

<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
      <th>Response Data</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Create a new user</td>
      <td>
      {<br>
          avatar: 'string'<br>
          name: 'string'<br>
          username: 'string',<br>
          email: 'string'<br>
          password: 'string'<br>
      }
      </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>Logs in user</td>
      <td>
      {<br>
          identifier [username or email]: 'string'<br>
          password: 'string'<br>
      }
      </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/enries</td>
      <td>Add a new entry</td>
      <td>
      {<br>
          title: 'string'<br>
          text: 'string'<br>
      }
      </td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/enries</td>
      <td>Get all entries</td>
      <td>null</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/enries/:entryId</td>
      <td>Get a specific entry</td>
      <td>null</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/enries/:entryId</td>
      <td>Update a specific entry</td>
      <td>
      {<br>
        title: 'string'<br>
        text: 'string<br>
      }
      </td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/archive/enries</td>
      <td>Archive a specific entry, or a list of entries</td>
      <td>
      {<br>
        entries: 'sting' or 'array'
      }
      </td>
  </tr>
</table>