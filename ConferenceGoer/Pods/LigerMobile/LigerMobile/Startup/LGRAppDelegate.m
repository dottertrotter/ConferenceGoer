//
//  LGRAppDelegate.m
//  Liger
//
//  Created by John Gustafsson on 1/11/13.
//  Copyright (c) 2013-2014 ReachLocal Inc. All rights reserved.  https://github.com/reachlocal/liger-ios/blob/master/LICENSE
//

#import "LGRAppDelegate.h"
#import "LGRApp.h"
#import "LGRAppearance.h"
#import "LGRPageFactory.h"
#import "LGRViewController.h"

@implementation LGRAppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
	[LGRApp setupPushNotifications];
	[LGRAppearance setupApperance];
	
	[[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"WebKitStoreWebDataForBackup"];

	NSDictionary *notification = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
	NSDictionary *args = notification ? @{@"notification": notification} : @{};

	self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
	self.window.backgroundColor = UIColor.whiteColor;
	self.window.rootViewController = [LGRPageFactory controllerForPage:@"Drawer" title:@"" args:args options:@{} parent:nil];
	[self.window makeKeyAndVisible];
	
	return YES;
}

- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
{
	NSUInteger length = [deviceToken length];

	int32_t a[length/4 + !!(length%4)];
	[deviceToken getBytes:a length:length];

	NSString *token = @"";
	for (NSUInteger i=0; i < length/4 + !!(length%4); i++) {
		token = [token stringByAppendingFormat:@"%x", a[i]];
	}

	[[self rootPage] pushNotificationTokenUpdated:token error:nil];
}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
{
	[[self rootPage] pushNotificationTokenUpdated:nil error:error];
}

- (void)application:(UIApplication*)application didReceiveRemoteNotification:(NSDictionary*)userInfo
{
	UIApplicationState state = [application applicationState];

	[[self rootPage] notificationArrived:userInfo background:state == UIApplicationStateInactive || state == UIApplicationStateBackground];
}

- (BOOL)application:(UIApplication*)application openURL:(NSURL*)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation
{
	[[self rootPage] handleAppOpenURL:url];
	return YES;
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
	[self.topPage pageWillAppear];
}

- (LGRViewController*)rootPage
{
	NSAssert([self.window.rootViewController isKindOfClass:LGRViewController.class], @"self.window.rootViewController must be a LGRViewController.");
	return (LGRViewController*)self.window.rootViewController;
}

@end
