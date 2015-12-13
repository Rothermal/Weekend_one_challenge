
// Bob and Jim are the test employees already in the system. 
// Bob Jones is an ex co-worker. 
// Jim Jones is really big on transendance through suffering.
var Bob = {
employeeFirstname:'Bob',
employeeLastname:'Jones',
employeeIdNumber:'1234',
employeeJobTitle:'parts specialist',
employeeSalary:'54000',
//currentlyEmployed:null
};
var Jim = {
employeeFirstname:'Jim',
employeeLastname:'Jones',
employeeIdNumber:'1235',
employeeJobTitle:'Makes kool-aid so good, youll die for it.',
employeeSalary:'12000',
//currentlyEmployed:null  
};
var employeeArray = [Bob,Jim];

var total = 0;



// was intially trying to update total thru jquery couldnt figrue it out.
// $(document).ready(function(){
// 	// $('#totalSalary').append('<p>$ ' + total'</p>');
// });
$(document).ready(function(){
	$("#employeeinfo").on('submit',function(event){
		event.preventDefault();
		var values = {};
		$.each($("#employeeinfo").serializeArray(), function(i, field){
			values[field.name] = field.value;
		});
		
		$("#employeeinfo").find("input[type=text],input[type=number]").val('');
		console.log(values);
		appendDom(values);
		employeeArray.push(values);
        calcMonthlyPayroll(employeeArray);		
    });
});
function appendDom(object){
	$("#showEmployees").append("<div></div>");
	var $el = $("#showEmployees").children().last();
	$el.data("employeeIdNumber", object.employeeIdNumber);
	$el.append("<p>" + object.employeeFirstname + "</p>");
	$el.append("<p>" + object.employeeLastname + "</p>");
	$el.append("<p>" + object.employeeIdNumber + "</p>");
	$el.append("<p>" + object.employeeJobTitle + "</p>");
	$el.append("<p>" + object.employeeSalary + "</p>");
	$el.append("<button class='fired'>GTFO</button>");

	$(".fired").on('click',function(){
		for(var i = 0; i<employeeArray.length; i++){
		if(employeeArray[i].employeeIdNumber == $(this).parent().data().employeeIdNumber){
		fired(employeeArray[i].employeeIdNumber);	
		}
	}
	$(this).parent().remove();
	});


}

//lists any current employees to the dom on page load.
$(document).ready(function(){
function appendDomCurrent(object){
	$("#showEmployees").append("<div></div>");
	var $el = $("#showEmployees").children().last();
	$el.data("employeeIdNumber", object.employeeIdNumber);
	$el.append("<p>" + object.employeeFirstname + "</p>");
	$el.append("<p>" + object.employeeLastname + "</p>");
	$el.append("<p>" + object.employeeIdNumber + "</p>");
	$el.append("<p>" + object.employeeJobTitle + "</p>");
	$el.append("<p>" + object.employeeSalary + "</p>");
	$el.append("<button class='fired'>GTFO</button>");
}
for(var i = 0; i <employeeArray.length;i++)
	appendDomCurrent(employeeArray[i]);
	$(".fired").on('click',function(){
	for(var i = 0; i<employeeArray.length;i++){
		if(employeeArray[i].employeeIdNumber == $(this).parent().data().employeeIdNumber){
		fired(employeeArray[i].employeeIdNumber);	
		}
	}
	$(this).parent().remove();
	});



});

// i input employee numbers and salary into this function, as long as they have a valid id #,
// i was attempting more functionallity but kept running into walls, figured i should atleast
// try to complete the assignemnt, 
// this function will add their total to the total that will be displayed.
var buildTotal=function(employee,monthlySal){  
    if(employee>0){
    total = total + monthlySal;
    }
    console.log("total",total);  
   document.getElementById('totalSalary').innerHTML ='$ ' + total;

};

// this determines monthly payroll.  i reset my total so i dont bloat it with multiple calls on the same employee. i run all employees 
// through a loop pulling off there id numbers and salary, and input those into a function called build total
var calcMonthlyPayroll = function(arrayOfEmployees){
    total = 0;
  	for(var i = 0; i<arrayOfEmployees.length;i++){
    var empID = arrayOfEmployees[i].employeeIdNumber;
    var value = parseInt(arrayOfEmployees[i].employeeSalary);
    var monthlySalary = Math.round(value /12);
    buildTotal(empID,monthlySalary);   
  }

};




//fired goes through employee list, checks for the specific id number, 
// resets that number to 0 so they wont be called in build total later. 
// and calls the employee status and calc monthly payroll.
var fired = function(idNumber){
  for(var i = 0; i<employeeArray.length; i++){
 	if(employeeArray[i].employeeIdNumber==idNumber){ 
	  	 employeeArray[i].employeeIdNumber = 0;
  		 // employeeStatus();
  		 calcMonthlyPayroll(employeeArray);
		}
	}
};
// overly complicated shit i should delete down below.
// employeeStatus, goes through employees and sets them up to be removed or added to documnent
// running out of time to get this function to work right. just some added bloatware at this point
// i could do the same thing now that i have it working by just checking for Id == 0 and appending that to the dom instead.
// var employeeStatus = function(){
//   for(i=0;i<employeeArray.length;i++){
//     if(employeeArray[i].employeeIdNumber >0  ){
//      employeeArray[i].currentlyEmployed = true;
//     } else{
//     employeeArray[i].currentlyEmployed = false;
//     }    
//   }    
// };

//pops the initial load of already employed dudes and dudettes into total. 
 calcMonthlyPayroll(employeeArray);

// End Of the Line

