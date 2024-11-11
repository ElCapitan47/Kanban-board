import React from 'react'
import { useState, useEffect } from 'react'
import DisplayDropdown from '../components/DisplayDropdown';
import { ReactComponent as BacklogIcon } from '../assets/icons_FEtask/Backlog.svg';
import { ReactComponent as TodoIcon } from '../assets/icons_FEtask/To-do.svg';
import { ReactComponent as InProgressIcon } from '../assets/icons_FEtask/in-progress.svg';
import { ReactComponent as DoneIcon } from '../assets/icons_FEtask/Done.svg';
import { ReactComponent as CancelledIcon } from '../assets/icons_FEtask/Cancelled.svg';
import { ReactComponent as AddIcon } from '../assets/icons_FEtask/add.svg';
import { ReactComponent as DotsIcon } from '../assets/icons_FEtask/3 dot menu.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/icons_FEtask/No-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/icons_FEtask/Img - Low Priority.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons_FEtask/Img - High Priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/icons_FEtask/Img - Medium Priority.svg';
import { ReactComponent as UrgentPriorityIcon } from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';






import Card from '../components/Card';
const Home = () => {
    const [data, setData] = useState(null); // Stores fetched data
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [error, setError] = useState(null); // Stores error message, if any
    const [grouping, setGrouping] = useState('Status');
    const [ordering, setOrdering] = useState('Priority');

    // Retrieve saved settings from localStorage if available
    useEffect(() => {
      const savedGrouping = localStorage.getItem('grouping');
      const savedOrdering = localStorage.getItem('ordering');

      if (savedGrouping) {
          setGrouping(savedGrouping);
      }
      if (savedOrdering) {
          setOrdering(savedOrdering);
      }
    }, []);

    // Save settings to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('grouping', grouping);
      localStorage.setItem('ordering', ordering);
    }, [grouping, ordering]);

    useEffect(() => {
      // Define the asynchronous fetch function
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result); // Set data to state
        } catch (err) {
          setError(err.message); // Set error to state
        } finally {
          setLoading(false); // Set loading to false when fetch completes
        }
      };
  
      fetchData();
    }, []); // Empty dependency array ensures this runs only once after the component mounts
    useEffect(()=>{
        console.log(data)
    },[data])
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const statuses= ['Backlog', 'Todo', 'In progress','Done','Cancelled'];
    const priorities=[0,1,2,3,4];
    const priorityTitles=['No Priority', 'Low', 'Medium', 'High', 'Urgent'];
    const userIds = data.users.map(user => user.id);
    const usernames = data.users.map(user => user.name);
    const statusIcons = {
      'Backlog': <BacklogIcon/>,
      'Todo': <TodoIcon/>,
      'In progress': <InProgressIcon/>,
      'Done': <DoneIcon/>,
      'Cancelled': <CancelledIcon/>,
    };
    const priorityIcons = {
      0: <NoPriorityIcon/>,
      1: <LowPriorityIcon/>,
      2: <MediumPriorityIcon/>,
      3: <HighPriorityIcon/>,
      4: <UrgentPriorityIcon/>,
    };
    

    // Function to sort tickets based on selected ordering (Priority or Title)
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (ordering === 'Priority') {
        return b.priority - a.priority; // Sort by priority in descending order
      } else if (ordering === 'Title') {
        return a.title.localeCompare(b.title); // Sort by title in ascending order
      }
      return 0;
    });
  };

  const groupTickets = () => {
    if (grouping === 'Status') {
      // Group by status
      return statuses.map((status) => {
        const filteredTickets = data.tickets.filter((ticket) => ticket.status === status);
        return {
          title: status,
          icon: statusIcons[status],
          tickets: filteredTickets,
          count: filteredTickets.length, // Add count of tickets
        };
      });
    } else if (grouping === 'Priority') {
      // Group by priority
      return priorities.map((priority) => {
        const filteredTickets = data.tickets.filter((ticket) => ticket.priority === priority);
        return {
          title: priorityTitles[priority],
          icon: priorityIcons[priority],
          tickets: filteredTickets,
          count: filteredTickets.length, // Add count of tickets
        };
      });
    } else if (grouping === 'User') {
      // Group by User
      return userIds.map((userId) => {
        const username = usernames[userIds.indexOf(userId)];
        const filteredTickets = data.tickets.filter((ticket) => ticket.userId === userId);
  
        return {
          title: username,
          tickets: filteredTickets,
          count: filteredTickets.length, // Add count of tickets
        };
      });
    }
    return [];
  };

    
  return (
    <div style={{ width: '100%', height: '100%',  overflowY: 'auto'}}>
        <div style={{ width: '100%', height: '10%', display: 'flex', alignItems: 'center', padding: '20px',}}>
            <DisplayDropdown grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering}/>
        </div>
        <div style={gridLayoutStyle}>
        
        {groupTickets().map((group, index) => {
         
          return (
            <div key={index} style={columnStyle}>
              <div style={titleAreaStyle}>
                <div>
                  {group.icon && <span style={iconStyle}>{group.icon}</span>} 
                  <span style={titleStyle}>{group.title}</span>
                  <span style={countStyle}>{group.count}</span> 
                </div>
                <div>
                  <div style={iconsAreaStyle}>
                    <AddIcon/>
                    <DotsIcon/>
                  </div>
                </div>  
              </div>
              {sortTickets(group.tickets).map((ticket, cardIndex) => (
                <Card key={cardIndex} title={ticket.title} tags={ticket.tag} id={ticket.id} priority={ticket.priority} status={ticket.status}/>
              ))}
            </div>
          );
        })}
       
        </div>
    </div>
  )
}
// Inline styles

const iconStyle = { marginRight: '10px' };

//CSS Grid
const gridLayoutStyle = {
  width: '100%',
  minHeight: '90%',
  height: 'fit-content',
  backgroundColor: '#ececec',
  display: 'grid',
  // gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', // Ensures columns fit within the screen
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px', // Space between the columns
  // paddingLeft: '20px',
  padding: '10px', // Remove padding to prevent overflow
  boxSizing: 'border-box', // Ensures padding and border are included within the width
  overflowX: 'hidden', // Prevent horizontal overflow
 
};

const columnStyle = { 
  borderRadius: '5px', 
  padding: '10px',
  display: 'flex', 
  flexDirection: 'column', 
  height: 'auto', // Full height to ensure background covers scrollable area
  boxSizing: 'border-box',
};
const titleAreaStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' };
const titleStyle = { fontSize: '18px', fontWeight: '500' };
const iconsAreaStyle = { display: 'flex', justifyContent: 'center', gap:'5px'};
const countStyle = { marginLeft: '10px', fontSize: '16px', color: '3b3b3b' };


export default Home