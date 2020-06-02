//Load the PuckJS plugin.
app.LoadPlugin( "PuckJS" );

//Global variables.
var count = 0;
var address = "";

//Called when application is started.
function OnStart()
{
    //Create a layout with objects vertically centered.
    lay = app.CreateLayout( "Linear", "VCenter,FillXY" );

    //Create image 1/3 of screen width.
	img = app.CreateImage( "Img/banglejs.png", 0.6 );
	lay.AddChild( img );

	//Create a select button.
    btnSelect = app.CreateButton( "Select Device", 0.5, 0.1 );
    btnSelect.SetMargins( 0, 0.1, 0, 0 );
    btnSelect.SetOnTouch( btnSelect_OnTouch );
    lay.AddChild( btnSelect );

    //Create an 'Update' button.
    btnUpdate = app.CreateButton( "Update", 0.5, 0.1 );
    btnUpdate.SetMargins( 0, 0.05, 0, 0 );
    btnUpdate.SetOnTouch( btnUpdate_OnTouch );
    lay.AddChild( btnUpdate );

    //Add layout to app.
    app.AddLayout( lay );

    //Create PuckJS/Bangle plugin.
    bangle = app.CreatePuckJS();
    bangle.SetOnConnect( OnConnect );

    //Load last count.
    count = app.LoadNumber( "BangleCount" );

    //Attempt to connect using previous BLE address.
    address = app.LoadText( "BangleAddress" );
    if( address )
    {
        bangle.Connect( addrßss );
        app.ShowProgress( "Connecting..." );
        setTimeout( function(){ app.HideProgress()}, 7000 );
    }
}

//Called when we are connected to the watch.
function OnConnect( name, address )
{
    app.HideProgress();
    app.ShowPopup( "Connected to Bangle" );

    //Save the BLE address for next time app starts.
    if( address ) app.SaveText( "BangleAddress", address );

    //Send our code the watch.
    var code = app.ReadFile( "WatchCode.js" );
    bangle.SendCode( code );
}

//Called when user touches the 'Select Device' button.
function btnSelect_OnTouch()
{
    //Scan for BLE devices with 'Bangle' in the name.
    bangle.Scan( "Bangle" );
}

//Called when user touches the 'Update' button.
function btnUpdate_OnTouch()
{
    //Update the watch screen with current count.
    bangle.SendCode( "ks(" + (count++) + ")" );

    //Save the count for next time app starts.
    app.SaveNumber( "BangleCount", count );
}
