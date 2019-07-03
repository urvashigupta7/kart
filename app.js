var express=require('express');
var app=express();
var client = require('flipkart-api-affiliate-client');
var ejs=require('ejs');
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

var fkClient = new client({
    trackingId:"yuganshch",
    token:"34adf1305516462d8ce93de45594da81",
},"json");


//GET ROUTE FOR HOME

app.get('/',function(req,res)
	   {
	fkClient.getAllOffers().then(function(value){
		 var val=JSON.parse(value.body);
		res.render('home.ejs',{offers:val.allOffersList});
		
		
});
});

//POST ROUTE FOR SEARCH BOX
app.post('/',function(req,res)
		{
	
	var productName=req.body.productName;
	res.redirect('/'+productName);
});

//GET RESULT FOR SHOWING SEARCH RESULTS
app.get('/:type',function(req,res)
	   {
	var product=req.params.type;
		fkClient.doKeywordSearch(product,10).then(function(value){
		 var val=JSON.parse(value.body);
		 res.render('searchresults.ejs',{results:val.products,searchkeyword:product});
		
		 });
	

});
app.listen(process.env.PORT,process.env.IP,function()
		  {
	console.log('server has started');
});