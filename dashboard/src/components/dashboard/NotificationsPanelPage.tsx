import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Settings,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "alert" | "update" | "info";
  severity?: "low" | "medium" | "high";
  isRead: boolean;
  location?: string;
}

const NotificationsPanelPage = () => {
  return (
    <DashboardLayout title="Notifications Panel - Tuticorin Police">
      <NotificationsPanel />
    </DashboardLayout>
  );
};

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "High Congestion Alert",
      description: "Severe traffic congestion detected at Main Junction.",
      time: "10 minutes ago",
      type: "alert",
      severity: "high",
      isRead: false,
      location: "Main Junction",
    },
    {
      id: "2",
      title: "Incident Report Updated",
      description: "Incident #1082 has been updated with new information.",
      time: "25 minutes ago",
      type: "update",
      isRead: false,
    },
    {
      id: "3",
      title: "New CCTV Camera Online",
      description: "New camera at Beach Road is now operational.",
      time: "1 hour ago",
      type: "info",
      isRead: true,
      location: "Beach Road",
    },
    {
      id: "4",
      title: "Road Closure Alert",
      description: "Harbor Road has been closed due to construction work.",
      time: "2 hours ago",
      type: "alert",
      severity: "medium",
      isRead: true,
      location: "Harbor Road",
    },
    {
      id: "5",
      title: "System Maintenance",
      description: "Scheduled maintenance will occur tonight at 2 AM.",
      time: "3 hours ago",
      type: "info",
      isRead: true,
    },
    {
      id: "6",
      title: "AI Prediction Alert",
      description: "AI predicts high congestion at Market Area in 30 minutes.",
      time: "4 hours ago",
      type: "alert",
      severity: "low",
      isRead: true,
      location: "Market Area",
    },
  ]);

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter((notification) => !notification.isRead)
    : notifications;

  const getNotificationIcon = (type: string, severity?: string) => {
    if (type === "alert") {
      if (severity === "high")
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      if (severity === "medium")
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
    if (type === "update")
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
    return <Bell className="h-5 w-5 text-slate-400" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-500" />
            Notifications Panel
          </h1>
          <p className="text-slate-400 mt-1">
            Stay updated with alerts and system notifications
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="unread-only"
              checked={showUnreadOnly}
              onCheckedChange={setShowUnreadOnly}
            />
            <label
              htmlFor="unread-only"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Show unread only
            </label>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-slate-300 border-slate-700 bg-slate-800/50"
            onClick={markAllAsRead}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-slate-800 text-slate-400">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                All Notifications
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                Alerts
              </TabsTrigger>
              <TabsTrigger
                value="updates"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                Updates
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">
                    All Notifications
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {filteredNotifications.length} notification
                    {filteredNotifications.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px] pr-4">
                    <div className="space-y-3">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border ${notification.isRead ? "bg-slate-800/50 border-slate-700" : "bg-slate-800 border-blue-500"}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {getNotificationIcon(
                                  notification.type,
                                  notification.severity,
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <h3 className="font-medium text-white">
                                    {notification.title}
                                  </h3>
                                  <div className="flex items-center gap-2">
                                    {notification.type === "alert" &&
                                      notification.severity && (
                                        <Badge
                                          className={`${notification.severity === "high" ? "bg-red-600" : notification.severity === "medium" ? "bg-amber-600" : "bg-yellow-600"}`}
                                        >
                                          {notification.severity
                                            .charAt(0)
                                            .toUpperCase() +
                                            notification.severity.slice(1)}
                                        </Badge>
                                      )}
                                    {!notification.isRead && (
                                      <Badge className="bg-blue-600">New</Badge>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-slate-300 mt-1">
                                  {notification.description}
                                </p>
                                <div className="flex items-center text-xs text-slate-400 mt-2">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{notification.time}</span>
                                  {notification.location && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <MapPin className="h-3 w-3 mr-1" />
                                      <span>{notification.location}</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center justify-end mt-2 gap-2">
                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Mark as read
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                          <Bell className="h-10 w-10 mb-2 text-slate-500" />
                          <p>No notifications to display</p>
                          {showUnreadOnly && (
                            <Button
                              variant="link"
                              className="mt-2 text-blue-400"
                              onClick={() => setShowUnreadOnly(false)}
                            >
                              Show all notifications
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="mt-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">
                    Alert Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px] pr-4">
                    <div className="space-y-3">
                      {filteredNotifications.filter((n) => n.type === "alert")
                        .length > 0 ? (
                        filteredNotifications
                          .filter((n) => n.type === "alert")
                          .map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg border ${notification.isRead ? "bg-slate-800/50 border-slate-700" : "bg-slate-800 border-blue-500"}`}
                            >
                              {/* Same notification content as above */}
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {getNotificationIcon(
                                    notification.type,
                                    notification.severity,
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h3 className="font-medium text-white">
                                      {notification.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      {notification.severity && (
                                        <Badge
                                          className={`${notification.severity === "high" ? "bg-red-600" : notification.severity === "medium" ? "bg-amber-600" : "bg-yellow-600"}`}
                                        >
                                          {notification.severity
                                            .charAt(0)
                                            .toUpperCase() +
                                            notification.severity.slice(1)}
                                        </Badge>
                                      )}
                                      {!notification.isRead && (
                                        <Badge className="bg-blue-600">
                                          New
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm text-slate-300 mt-1">
                                    {notification.description}
                                  </p>
                                  <div className="flex items-center text-xs text-slate-400 mt-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{notification.time}</span>
                                    {notification.location && (
                                      <>
                                        <span className="mx-2">•</span>
                                        <MapPin className="h-3 w-3 mr-1" />
                                        <span>{notification.location}</span>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-end mt-2 gap-2">
                                    {!notification.isRead && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                        onClick={() =>
                                          markAsRead(notification.id)
                                        }
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Mark as read
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                      onClick={() =>
                                        deleteNotification(notification.id)
                                      }
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                          <AlertTriangle className="h-10 w-10 mb-2 text-slate-500" />
                          <p>No alert notifications to display</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="mt-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">
                    Update Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px] pr-4">
                    <div className="space-y-3">
                      {filteredNotifications.filter((n) => n.type === "update")
                        .length > 0 ? (
                        filteredNotifications
                          .filter((n) => n.type === "update")
                          .map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg border ${notification.isRead ? "bg-slate-800/50 border-slate-700" : "bg-slate-800 border-blue-500"}`}
                            >
                              {/* Same notification content structure */}
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h3 className="font-medium text-white">
                                      {notification.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      {!notification.isRead && (
                                        <Badge className="bg-blue-600">
                                          New
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm text-slate-300 mt-1">
                                    {notification.description}
                                  </p>
                                  <div className="flex items-center text-xs text-slate-400 mt-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{notification.time}</span>
                                    {notification.location && (
                                      <>
                                        <span className="mx-2">•</span>
                                        <MapPin className="h-3 w-3 mr-1" />
                                        <span>{notification.location}</span>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-end mt-2 gap-2">
                                    {!notification.isRead && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                        onClick={() =>
                                          markAsRead(notification.id)
                                        }
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Mark as read
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                      onClick={() =>
                                        deleteNotification(notification.id)
                                      }
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                          <CheckCircle className="h-10 w-10 mb-2 text-slate-500" />
                          <p>No update notifications to display</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info" className="mt-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">
                    Information Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px] pr-4">
                    <div className="space-y-3">
                      {filteredNotifications.filter((n) => n.type === "info")
                        .length > 0 ? (
                        filteredNotifications
                          .filter((n) => n.type === "info")
                          .map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg border ${notification.isRead ? "bg-slate-800/50 border-slate-700" : "bg-slate-800 border-blue-500"}`}
                            >
                              {/* Same notification content structure */}
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h3 className="font-medium text-white">
                                      {notification.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      {!notification.isRead && (
                                        <Badge className="bg-blue-600">
                                          New
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm text-slate-300 mt-1">
                                    {notification.description}
                                  </p>
                                  <div className="flex items-center text-xs text-slate-400 mt-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{notification.time}</span>
                                    {notification.location && (
                                      <>
                                        <span className="mx-2">•</span>
                                        <MapPin className="h-3 w-3 mr-1" />
                                        <span>{notification.location}</span>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-end mt-2 gap-2">
                                    {!notification.isRead && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                        onClick={() =>
                                          markAsRead(notification.id)
                                        }
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Mark as read
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                      onClick={() =>
                                        deleteNotification(notification.id)
                                      }
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                          <Bell className="h-10 w-10 mb-2 text-slate-500" />
                          <p>No information notifications to display</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-500" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email-notifications"
                    className="text-sm text-slate-300"
                  >
                    Email Notifications
                  </label>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="sms-notifications"
                    className="text-sm text-slate-300"
                  >
                    SMS Notifications
                  </label>
                  <Switch id="sms-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="high-priority"
                    className="text-sm text-slate-300"
                  >
                    High Priority Only
                  </label>
                  <Switch id="high-priority" />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="sound-alerts"
                    className="text-sm text-slate-300"
                  >
                    Sound Alerts
                  </label>
                  <Switch id="sound-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="desktop-notifications"
                    className="text-sm text-slate-300"
                  >
                    Desktop Notifications
                  </label>
                  <Switch id="desktop-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white">
                Notification Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">
                    Total Notifications
                  </span>
                  <span className="text-sm font-medium text-white">
                    {notifications.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Unread</span>
                  <span className="text-sm font-medium text-blue-400">
                    {notifications.filter((n) => !n.isRead).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Alerts</span>
                  <span className="text-sm font-medium text-amber-400">
                    {notifications.filter((n) => n.type === "alert").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Updates</span>
                  <span className="text-sm font-medium text-green-400">
                    {notifications.filter((n) => n.type === "update").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Information</span>
                  <span className="text-sm font-medium text-slate-400">
                    {notifications.filter((n) => n.type === "info").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanelPage;
