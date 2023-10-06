if (stored_hour != current_hour) {
  // Create a new payload and register devices to database

  if (payload_src == process.env.CLIENTID1) {
    try {
      const Payload = new Payloads({
        user_id,
        id: payload_src,
        applience_id: shelly1.applience_id,
        date: `${year}-${month}-${day}`,
        hour: `${current.getHours()}:00`,
        labels_array: [],
        data: {
          apower: power,
          voltage: voltage,
          current: current_,
          aenergy: aenergy,
        },
      });
      // Check if paylaod to be created already exist
      let results = await Payloads.find({
        user_id: user_id,
        id: payload_src,
        applience_id: shelly1.applience_id,
        hour: `${current.getHours()}:00`,
      });
      if (results.length >= 2) {
        console.log("Payloads exist");
      } else if (results.length == 0) {
        Payload.save()
          .then((saved) => {
            console.log("Payload created");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  } else if (payload_src == process.env.CLIENTID2) {
    const Payload = new Payloads({
      user_id,
      id: payload_src,
      applience_id: shelly2.applience_id,
      date: `${year}-${month}-${day}`,
      hour: `${current.getHours()}:00`,
      labels_array: [],
      data: {
        apower: power,
        voltage: voltage,
        current: current_,
        aenergy: aenergy,
      },
    });
    //   Check if there is payload with defined info for creating new one
    let results = await Payloads.find({
      user_id: user_id,
      id: payload_src,
      applience_id: shelly2.applience_id,
      hour: `${current.getHours()}:00`,
    });
    if (results.length >= 2) {
      console.log("Payloads exist");
    } else if (results.length == 0) {
      Payload.save()
        .then((saved) => {
          stored_hour = current_hour;
          console.log("Payload created and hour changed");
        })
        .catch((err) => {
          response.send(err);
        });
    }
  }
} else {
  if (stored_minute != current_minute) {
    // console.log("Stored Minute: ",stored_minute);
    // console.log("Current minute: ",current_minute,"\n");
    stored_minute = current_minute;
    topic1 = 0;
    topic2 = 0;
  } else {
    // console.log("Stored Minute: ",stored_minute);
    // console.log("Current minute: ",current_minute,"\n");
    let result = await Payloads.find({
      user_id: user_id,
      // applience_id: payload.applience_id,
      // hour: hour,
    });
    console.log("Result", result);
    let result1 = result[0];
    let result2 = result[1];
    if (payload_src == process.env.CLIENTID1 && topic1 == 0) {
      // Update appropriate Payload
      payload.applience_id = shelly1.applience_id;
      topic1 = 1;
      // console.log(
      //   "Payload 1 at ",
      //   `${current_hour}:${current_minute}`,
      //   "",
      //   payload
      // );
      try {
        let hour =
          current.getHours() < 10
            ? `0${current.getHours()}`
            : current.getHours() + ":00";
        // let result = await Payloads.find({
        //   user_id: user_id,
        //   // applience_id: payload.applience_id,
        //   // hour: hour,
        // });
        // result = result[0]
        // console.log(
        //   "Results for user:",
        //   user_id,
        //   " \n",
        //   payload_src,
        //   " and ",
        //   payload.applience_id,
        //   "at",
        //   hour,
        //   " ",
        //   result,
        //   " \n"
        // );

        let labels = result1.labels_array;
        console.log("Array from DB before update: ", labels);
        let dataArray = result1.data;
        labels.push(
          `${
            current.getHours() < 10
              ? `0${current.getHours()}`
              : current.getHours()
          }:${
            current.getMinutes() < 10
              ? `0${current.getMinutes()}`
              : current.getMinutes()
          }`
        );
        console.log("Array to be sent to db: ", labels);
        let data = {
          apower: power,
          voltage,
          current: current_,
          aenergy,
        };
        dataArray.push(data);
        // console.log(labels);

        await Payloads.updateOne(
          {
            id: payload_src,
            user_id: user_id,
            applience_id: payload.applience_id,
            hour: hour,
          },
          {
            labels_array: labels,
            data: dataArray,
          }
        );
        const UpdatedPayload = await Payloads.findOne({
          id: payload_src,
          // user_id: user_id,
          // applience_id: payload.applience_id,
          // hour: hour,
        });

        WebSocketServer.clients.forEach(function each(client) {
          if (client === ws && client.readyState === WebSocket.OPEN) {
            // console.log(
            //   "Uprocessed Updated Data: ",
            //   UpdatedPayload["data"]
            // );

            let json = {
              payload_src,
              labels_array: UpdatedPayload["labels_array"],
              data: UpdatedPayload["data"],
            };
            const resultPayload = JSON.stringify(json);
            // console.log("Updated Data: ", resultPayload);
            try {
              //Parse the incoming messages to json format
              //   parsedMessage = JSON.stringify(UpdatedPayload);
              console.log("Sending data for: ", payload_src);
              client.send(resultPayload);
              //let src = parsedMessage.src;
            } catch (error) {
              console.error("Error parsing MQTT message:", error);
              return;
            }
          } else {
            console.log("Clients websockets not open");
          }
        });
        // console.log("Data updated");
      } catch (err) {
        console.log(err);
      }
    } else if (payload_src == process.env.CLIENTID2 && topic2 == 0) {
      // Update appropriate payload
      payload.applience_id = shelly2.applience_id;
      topic2 = 1;
      // console.log(
      //   "Payload 2  at ",
      //   `${current_hour}:${current_minute}`,
      //   "",
      //   payload
      // );
      try {
        let hour =
          current.getHours() < 10
            ? `0${current.getHours()}`
            : current.getHours() + ":00";
        // const result = await Payloads.findOne({
        //   id: payload_src,
        //   // user_id: user_id,
        //   // applience_id: payload.applience_id,
        //   // hour: hour,
        // });
        // console.log(
        //   "Results for user:",
        //   user_id,
        //   " \n",
        //   payload_src,
        //   " and ",
        //   payload.applience_id,
        //   "at",
        //   hour,
        //   " ",
        //   result,
        //   " \n"
        // );

        let labels = result2.labels_array;
        let dataArray = result2.data;
        labels.push(
          `${
            current.getHours() < 10
              ? `0${current.getHours()}`
              : current.getHours()
          }:${
            current.getMinutes() < 10
              ? `0${current.getMinutes()}`
              : current.getMinutes()
          }`
        );

        let data = {
          apower: power,
          voltage,
          current: current_,
          aenergy,
        };
        dataArray.push(data);
        // console.log(labels);

        await Payloads.updateOne(
          {
            id: payload_src,
            user_id: user_id,
            applience_id: payload.applience_id,
            hour: hour,
          },
          {
            labels_array: labels,
            data: dataArray,
          }
        );
        const payload_ = await Payloads.find({
          user_id: user_id,
        });

        let UpdatedPayload = payload_[0];
        console.log("Updated payload,", UpdatedPayload);
        // console.log("Updated Data: ",resultPayload[]);
        WebSocketServer.clients.forEach(function each(client) {
          if (client === ws && client.readyState === WebSocket.OPEN) {
            // console.log(
            //   "Uprocessed Updated Data: ",
            //   UpdatedPayload
            // );

            let json = {
              payload_src,
              labels_array: UpdatedPayload["labels_array"],
              data: JSON.stringify(UpdatedPayload["data"]),
            };
            const resultPayload = JSON.stringify(json);
            // console.log("Updated Data: ", resultPayload);
            try {
              //Parse the incoming messages to json format
              //   parsedMessage = JSON.stringify(UpdatedPayload);
              console.log("Sending data for: ", payload_src);
              client.send(resultPayload);
              //let src = parsedMessage.src;
            } catch (error) {
              console.error("Error parsing MQTT message:", error);
              return;
            }
          } else {
            console.log("Clients websockets not open");
          }
        });
        // console.log("Data updated");
      } catch (err) {
        console.log(err);
      }
    }
  }
}
