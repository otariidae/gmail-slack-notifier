const properties = PropertiesService.getScriptProperties()
const SLACK_TOKEN = properties.getProperty("TOKEN")
const SLACK_CHANNEL = properties.getProperty("CHANNEL")
const INVOKE_INTERVAL = 5 * 60 * 1000 // 5 min

function myFunction(): void {
  const invokeDate = new Date()
  const afterDate = new Date(invokeDate.getTime() - INVOKE_INTERVAL)
  const afterInSec = Math.floor(afterDate.getTime() / 1000)
  // ref: https://developers.google.com/gmail/api/guides/filtering
  const threads = GmailApp.search(
    `in:inbox is:important category:primary after:${afterInSec}`
  )

  for (const thread of threads) {
    const messages = thread.getMessages()
    for (const message of messages) {
      const date = message.getDate()
      if (date < afterDate) {
        continue
      }

      const content = `
Subject: ${message.getSubject()}
Date: ${Utilities.formatDate(message.getDate(), "JST", "yyyy/MM/dd (E) HH:mm:ss Z")}
From: ${message.getFrom()}
To: ${message.getTo()}

${message.getPlainBody()}
`.trim()
      // upload mail content as text file
      // ref: https://api.slack.com/methods/files.upload
      const payload = {
        channels: SLACK_CHANNEL,
        content: content,
        title: message.getSubject(),
        filename: message.getHeader("Message-ID"),
        filetype: "text",
        initial_comment: thread.getPermalink(),
      }
      const httpsResponse = UrlFetchApp.fetch(
        "https://slack.com/api/files.upload",
        {
          headers: {
            Authorization: `Bearer ${SLACK_TOKEN}`,
          },
          method: "post",
          payload: payload,
        }
      )
      const response = JSON.parse(httpsResponse.getContentText())
      console.log(response)
      if (!response.ok) {
        console.error(`${httpsResponse.getResponseCode()}: ${response.error}`)
      }
    }
  }
}
