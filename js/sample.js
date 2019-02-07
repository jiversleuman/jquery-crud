var country;
var countries = [];
let countries2 = JSON.parse(localStorage.getItem("countries"));

//Add country
$(document).ready(function() {
    $(".btn-primary").click(function(){
        country = $("#country").val();

        if(countries2 == null){
            countries.push(country);

            localStorage.setItem("countries", JSON.stringify(countries));
        }else{
            countries = countries2;
            countries.push(country);

            localStorage.setItem("countries", JSON.stringify(countries));
        }
    });
});

//Read from local storage
$(document).ready(function() {
    $("#countryTR").html("");
    
    if(countries2 != null){
        for(var i = 0; i < countries2.length; i++){
            $("#countryTR").append(`
                <div class="bg-dark border border-success text-white card mb-2">
                    <div class="card-body">
                        <p id="countryname">${countries2[i]}</p>
                        <button class="col-5 text-white btn btn-warning edit_btn">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="col-5 text-white btn btn-danger del_btn">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `);
        }
    }
    else{

    }
});

//Edit country
    $(document).on("click" , ".edit_btn", function(){
       var index = $(this).parent().parent().index();
       
        if(countries2[index] != null){
            $(this).parent().html(`
                        <p>${countries2[index]}</p>
                        <input class="mb-2 form-control" id="newcountry" placeholder="${countries2[index]}">
                        <button class="col-5 text-white btn btn-danger update_btn">
                            <i class="fas fa-check-square"></i> Update
                        </button>
                        <button class="col-5 text-white btn btn-danger cancel_btn">
                            <i class="fas fa-ban"></i> Cancel
                        </button>
            `);
        }
        else{
            $(this).parent().html(`
                   <p>${countries2[index]}</p>
                    <button disabled class="col-5 text-white btn btn-warning edit_btn">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button disabled class="col-5 text-white btn btn-danger del_btn" >
                        <i class="fas fa-trash"></i> Delete
                    </button>  
            `);
        }
        $(".edit_btn").attr("disabled", true);
        $(".del_btn").attr("disabled", true);

     
    });

//Update country
    $(document).on("click" , ".update_btn" , function(){
        var index = $(this).parent().parent().index();
    
        countries2[index] = $("#newcountry").val();

        localStorage.setItem("countries", JSON.stringify(countries2));

        $(".edit_btn").attr("disabled", false);
        $(".del_btn").attr("disabled", false);

        $(this).parent().html(`
        <p>${countries2[index]}</p>
        <button class="col-5 text-white btn btn-warning edit_btn">
            <i class="fas fa-edit"></i> Edit
        </button>
        <button class="col-5 text-white btn btn-danger del_btn" >
            <i class="fas fa-trash"></i> Delete
        </button>  
            `);
    });

//Cancel button
 $(document).on("click" , ".cancel_btn" , function(){
        var index = $(this).parent().parent().index();
    
        $(".edit_btn").attr("disabled", false);
        $(".del_btn").attr("disabled", false);

        $(this).parent().html(`
        <p>${countries2[index]}</p>
        <button class="col-5 text-white btn btn-warning edit_btn">
            <i class="fas fa-edit"></i> Edit
        </button>
        <button class="col-5 text-white btn btn-danger del_btn" >
            <i class="fas fa-trash"></i> Delete
        </button>  
            `);
});

//Delete country
$(document).on("click" , ".del_btn" , function(){
    var index = $(this).parent().parent().index();
       
    countries2.splice(index, 1);

    $(this).parent().parent('div').remove();

    localStorage.setItem("countries", JSON.stringify(countries2));
    
});

