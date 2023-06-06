"use client";
import { Button, Grid, PressEvent, Textarea } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

const TextInput = ({ label, ...props }: { label: string }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    console.log(event);
    setValue(event.target.value);
  };

  const handleSubmit = async (_e: PressEvent) => {
    const postData = async () => {
      const response = await fetch("/api/spam", {
        method: "POST",
        body: JSON.stringify({ message: value }),
      });
      return response.json();
    };
    postData().then((data) => {
      console.log(data);
    });
    // submit to openai api
    // const response = await fetch("/api/spam", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     message: "hi",
    //   }),
    // });

    // if (!response.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error("Failed to fetch data");
    // }
    // console.log(response.json());
    // display response
    // }
  };

  const handleCancel = (_e: PressEvent) => {
    console.log("cancel");
    setValue("");
  };
  return (
    <div>
      <form>
        <Textarea
          label="Enter potential spam content."
          placeholder="Enter potential spam content."
          value={value}
          onChange={handleChange}
        />
        <Grid.Container gap={2}>
          <Grid>
            <Button color="primary" auto onPress={handleSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid>
            <Button color="secondary" auto onPress={handleCancel}>
              Reset
            </Button>
          </Grid>
        </Grid.Container>
      </form>
    </div>
  );
};
export default TextInput;
